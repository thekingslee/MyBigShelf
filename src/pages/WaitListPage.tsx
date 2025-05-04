import Iphone from '@/assets/iPhone.svg';
import NavBar from '@/components/NavBar';
import WaitListBenefits from '@/components/WaitListBenefits';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Card, CardContent } from '@/components/ui/card';
import Footer from '@/components/Footer';
import { base } from '@/services/api-client';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import InputControl from '@/components/Form/InputControl';
import { ClipLoader } from 'react-spinners';

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(3).max(30),
  phone_number: z.string().min(11).max(11),
});

type formData = z.infer<typeof schema>;

const WaitListPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<formData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      name: '',
      phone_number: '',
    },
  });

  const defaultActionButton = (
    <Link to="/">
      <Button className="w-[248px] h-[48px] text-white text-lg font-bold font-bodyBoldFont px-[16px] py-[13px] bg-custom-black-900 rounded-[12px]">
        Place an order
      </Button>
    </Link>
  );

  const onSubmit = (values: formData) => {
    setIsLoading(true);

    const payload = {
      email: values.email,
      name: values.name,
      phone_number: values.phone_number,
    };

    base(import.meta.env.VITE_WAITLIST_AIRTABLE_TABLE).create(
      [
        {
          fields: payload,
        },
      ],
      function (err, records) {
        if (err) {
          console.error(err);
          //setToast("error");
          toast.error('Something went wrong');
          setIsLoading(false);
          return;
        }
        records?.forEach(function () {
          //reset();
        });
        setIsLoading(false);
        setTimeout(() => navigate('/'), 1000);
        toast.success('Congrats🎉, submitted successfully');
      }
    );
  };

  return (
    <div className="font-bodyRegularFont">
      <Toaster />
      <section className="bg-custom-testimonial-card-bg">
        <NavBar actionButtons={defaultActionButton} />
        <section className="grid grid-rows-[1fr_300px] lg:grid-rows-1 lg:grid-cols-2 pt-[50px] lg:pt-[100px]">
          <div className="flex justify-center row-start-2 lg:row-start-1">
            <img
              className="h-[300px] md:h-auto"
              src={Iphone}
              alt="Iphone Icon"
            />
          </div>
          <div>
            <div>
              <h2 className="font-headingFont text-center lg:text-left font-semibold text-custom-black-900 text-3xl md:text-4xl xl:text-[43.847px]/[50.111px] mb-2">
                Start reaching your reading goals.
              </h2>
              <p className="text-custom-text-body text-center lg:text-left font-bodyRegularFont text-base md:text-xl">
                3 easy steps to nuture a reading habit.
              </p>
            </div>
            <div className="flex flex-col justify-center items-center lg:items-start gap-4 px-4 lg:px-0 mt-4 mb-6 lg:mb-0">
              <WaitListBenefits number="1">
                Download the BigShelf App
              </WaitListBenefits>
              <div className="xl:pl-[100px]">
                <WaitListBenefits number="2">
                  Discover books through the Big community and make purchase
                  with ease.
                </WaitListBenefits>
              </div>
              <div className="xl:pl-[180px]">
                <WaitListBenefits number="3">
                  Stick to a healthy routine
                </WaitListBenefits>
              </div>
            </div>
          </div>
        </section>
      </section>

      <section className="bg-custom-black-50 h-screen  flex justify-center items-center px-4 lg:px-0">
        <div className="w-auto md:w-[600px] lg:w-[800px] rounded-[30px] py-4 bg-white mx-auto flex flex-col gap-6 justify-center items-center">
          <h2 className="text-center text-custom-black-900 font-headingFont text-4xl lg:text-5xl font-semibold py-[30px]">
            Set yourself up for success.
          </h2>
          <Card className="w-[300px] lg:w-[500px] bg-white border-none shadow-none rounded-none p-0 m-0">
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8 font-bodyRegularFont"
                >
                  <InputControl
                    control={form.control}
                    name="email"
                    label="Email"
                    placeholder="Enter your email"
                  />

                  <InputControl
                    control={form.control}
                    name="name"
                    label="Name"
                    placeholder="Enter full name"
                  />

                  <InputControl
                    control={form.control}
                    name="phone_number"
                    label="Phone number"
                    placeholder="09089344163"
                  />
                  <div className="flex justify-center">
                    <Button
                      type="submit"
                      className="w-[225px] h-[48px] bg-custom-black-900 py-[14px] font-poppinsFont lg:text-lg"
                      disabled={!form.formState.isValid}
                    >
                      {isLoading ? (
                        <ClipLoader color="#fff" size={24} />
                      ) : (
                        'Join the waitlist'
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="lg:flex lg:justify-center bg-white pt-[150px]">
        <Footer />
      </footer>
    </div>
  );
};

export default WaitListPage;
