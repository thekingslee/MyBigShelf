import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ScaleLoader from "react-spinners/ScaleLoader";
import { CSSProperties } from "react";
import protectedInstance from "@/services/protected-api-client";
import { statesAndCities } from "@/utils";
import InputControl from "./Form/InputControl";
import SelectControl from "./Form/SelectControl";
import TextAreaControl from "./Form/TextAreaControl";
import CheckboxControl from "./Form/CheckboxControl";
import { X } from "lucide-react";

const schema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters." })
    .max(20, { message: "Name must not be longer than 50 characters" }),
  phoneNo: z.string().min(11).max(11),
  state: z.string().min(3).max(20),
  city: z.string().min(3).max(30),
  address: z.string().min(3),
  extra: z
    .string()
    .min(0, { message: "Optional" })
    .max(160, { message: "Bio must not be longer than 30 characters." })
    .default(""),
  setDefault: z.boolean().default(false),
});

const AddressFormDrawer = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const override: CSSProperties = {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const addAddress = useMutation({
    mutationFn: (value: z.infer<typeof schema>) =>
      protectedInstance.post(`/users/address`, value).then((res) => res.data),
    onSuccess: () => {
      toast.success("Address added successfully");
      form.reset();
      setOpen(false);
      queryClient.invalidateQueries({
        queryKey: ["address"],
      });
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const handleSubmit = (values: z.infer<typeof schema>) => {
    addAddress.mutate(values);
  };

  const stateOptions = statesAndCities.states.map((state) => ({
    value: state.name,
    label: state.name,
  }));

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="max-w-[180px] border border-solid border-custom-black-300 font-bodyBoldFont font-bold text-custom-text-primary hover:bg-custom-secondary hover:text-white"
        >
          Add new address
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[90vh]">
      <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
        <div className="flex justify-center overflow-auto no-scrollbar">
          <div className="max-w-lg w-full p-6 overflow-auto no-scrollbar">
            <DrawerClose className="hidden sm:block absolute right-4 top-4">
              <Button
                variant="outline"
                className="w-[40px] h-[40px] rounded-full bg-custom-black-100 border border-solid border-custom-black-500"
                size="icon"
              >
                <X className="h-5 w-5" />
              </Button>
            </DrawerClose>
            <DrawerHeader>
              <DrawerTitle className="text-center">
                <h2 className="text-2xl font-bodyBoldFont font-bold text-custom-text-primary mb-2">
                  Add a new address
                </h2>
                <p className="text-base font-bodyRegularFont text-custom-text-body font-normal">
                  Fill the form below to add a new shipping information.
                </p>
              </DrawerTitle>
            </DrawerHeader>
            <div className="p-4 pb-0">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="space-y-4"
                >
                  <InputControl
                    control={form.control}
                    name="name"
                    label="Who is receiving the order?"
                    placeholder="Enter full name"
                  />
                  <InputControl
                    control={form.control}
                    name="phoneNo"
                    label="Phone number"
                    placeholder="09089344163"
                  />
                  <div className="grid gap-4 grid-cols-2">
                    <SelectControl
                      control={form.control}
                      name="state"
                      label="State"
                      placeholder="Select a state"
                      options={stateOptions}
                    />
                    <InputControl
                      control={form.control}
                      name="city"
                      label="City"
                      placeholder="Select a city"
                    />
                  </div>
                  <InputControl
                    control={form.control}
                    name="address"
                    label="Enter address of the receiver"
                    placeholder="Emeka Akigwe street"
                  />
                  <TextAreaControl
                    control={form.control}
                    name="extra"
                    label="Extra information"
                    placeholder="Enter detailed information that will help us locate you."
                    rows={3}
                  />
                  <CheckboxControl
                    control={form.control}
                    name="setDefault"
                    label="Set as default address"
                  />
                  <Button
                    type="submit"
                    className="w-full h-[48px] rounded-[8px] px-4 py-[13px] font-bodyBoldFont font-bold text-base text-custom-black-50 bg-custom-text-primary hover:bg-custom-secondary hover:text-custom-black-50"
                  >
                    {addAddress.isLoading ? (
                      <ScaleLoader
                        color="#fff"
                        loading={true}
                        cssOverride={override}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                      />
                    ) : (
                      "Add address"
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default AddressFormDrawer;
