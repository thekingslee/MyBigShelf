import React, { CSSProperties } from 'react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './ui/drawer';
import { Button } from './ui/button';
import { ScaleLoader } from 'react-spinners';
import { Form } from './ui/form';
import InputControl from './Form/InputControl';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
// import protectedInstance from '@/services/protected-api-client';
import Divider from './Divider';
import CheckboxControl from './Form/CheckboxControl';
import { X } from 'lucide-react';
import { axiosInstance } from '@/services/api-client';

const schema = z.object({
  title: z.string().min(1, { message: 'Book title is required' }),
  author: z.string().min(1, { message: 'Author name is required' }),
  fullName: z.string().min(1, { message: 'Full name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phoneNumber: z.string().min(10, { message: 'Invalid phone number' }),
  notifyWhenAvailable: z.boolean().default(false),
});

const RequestBookDrawer: React.FC = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = React.useState(false);
  const override: CSSProperties = {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const requestBook = useMutation({
    mutationFn: (value: z.infer<typeof schema>) =>
      axiosInstance.post(`/books/request`, value).then((res) => res.data),
    onSuccess: () => {
      toast.success('Book request submitted successfully');
      form.reset();
      setOpen(false);
      queryClient.invalidateQueries({
        queryKey: ['bookRequests'], //Chores: Remove later
      });
    },
    onError: () => {
      toast.error('Something went wrong');
    },
  });

  const handleSubmit = (values: z.infer<typeof schema>) => {
    requestBook.mutate(values);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="w-auto sm:w-[300px] h-[48px] px-4 py-[13px] rounded-[8px] bg-custom-text-primary text-custom-black-50 font-bodyBoldFont font-bold text-base hover:bg-custom-secondary hover:text-custom-black-50"
        >
          Request a book
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[90vh]">
        <div className="flex justify-center overflow-auto">
          <div className="max-w-lg w-full overflow-auto no-scrollbar p-6">
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
                  Can't Find the Book You Need?
                </h2>
                <p className="text-base font-bodyRegularFont text-custom-text-body font-normal">
                  Let us know what you're looking for, and we'll help you track
                  it down! Fill out the form below, and we'll notify you once
                  it's available.
                </p>
              </DrawerTitle>
            </DrawerHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4"
              >
                <Divider text="About book" />
                <InputControl
                  control={form.control}
                  name="title"
                  label="What's the book title?"
                  placeholder="Enter book title"
                />
                <InputControl
                  control={form.control}
                  name="author"
                  label="Who is the author of the book?"
                  placeholder="Enter the book author"
                />
                <div className="pt-2">
                  <Divider text="Contact" />
                </div>
                <InputControl
                  control={form.control}
                  name="fullName"
                  label="Your full name"
                  placeholder="Enter full name"
                />
                <InputControl
                  control={form.control}
                  name="email"
                  label="Your email"
                  placeholder="Enter email address"
                />
                <InputControl
                  control={form.control}
                  name="phoneNumber"
                  label="Phone number"
                  placeholder="70 5700 0000"
                />
                <CheckboxControl
                  control={form.control}
                  name="notifyWhenAvailable"
                  label="Notify me when the book is available"
                />
                <Button
                  type="submit"
                  className="w-full h-[48px] rounded-[8px] px-4 py-[13px] font-bodyBoldFont font-bold text-base text-custom-black-50 bg-custom-text-primary hover:bg-custom-secondary hover:text-custom-black-50"
                >
                  {requestBook.isLoading ? (
                    <ScaleLoader
                      color="#fff"
                      loading={true}
                      cssOverride={override}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  ) : (
                    'Request for a book'
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default RequestBookDrawer;
