import Footer from '@/components/Footer';
import Testimonial from '@/components/Testimonial';
import Text from '@/components/Text';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { base } from '@/services/api-client';
import styles from './AffliatePage.module.css';
import AffiliateHeroImg from '@/assets/AffiliateHeroImg.png';
import NavBar from '@/components/NavBar';
import CreditCard from '@/components/CreditCard';
import InputControl from '@/components/Form/InputControl';
import TextAreaControl from '@/components/Form/TextAreaControl';
import SelectControl from '@/components/Form/SelectControl';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';

const schema = z.object({
  full_name: z
    .string()
    .min(3, { message: 'Full name must have atleast 3 characters' })
    .max(50),
  email: z.string().email(),
  phone_number: z
    .string()
    .min(11, { message: 'Your phone number must contain up to 11 digits' })
    .max(14),
  why_you_are_applying: z.string().min(10, {
    message: 'You must be at least 10 characters.',
  }),
  country: z
    .string()
    .min(3, { message: 'Country name must have atleast 3 characters' })
    .max(50),
  state: z
    .string()
    .min(3, { message: 'State must have atleast 3 characters' })
    .max(50),
  have_a_hub: z.string().min(2, { message: 'Select either Yes or No' }).max(5),
  hub_address: z
    .string()
    .min(3, { message: 'Hub Address must have atleast 3 characters' })
    .max(50),
});

type formData = z.infer<typeof schema>;

const AffliatePage = () => {
  const defaultActionButton = (
    <Link to="/">
      <Button className="w-[248px] h-[48px] text-white text-lg font-bold font-bodyBoldFont px-[16px] py-[13px] bg-custom-black-900 rounded-[12px]">
        Place an order
      </Button>
    </Link>
  );

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<formData>({
    resolver: zodResolver(schema),
    defaultValues: {
      full_name: '',
      email: '',
      phone_number: '',
      why_you_are_applying: '',
      country: '',
      state: '',
      have_a_hub: '',
      hub_address: '',
    },
  });

  const onSubmit = (values: formData) => {
    setIsLoading(true);

    const payload = {
      full_name: values.full_name,
      email: values.email,
      phone_number: values.phone_number,
      why_you_are_applying: values.why_you_are_applying,
      country: values.country,
      state: values.state,
      have_a_hub: values.have_a_hub,
      hub_address: values.hub_address,
    };

    base(import.meta.env.VITE_AFFILIATE_AIRTABLE_TABLE).create(
      [
        {
          fields: payload,
        },
      ],
      function (err, records) {
        if (err) {
          console.error(err);
          toast.error('Uh oh! Something went wrong.');
          setIsLoading(false);
          return;
        }
        records?.forEach(function () {
          //reset();
        });
        setIsLoading(false);
        setTimeout(() => navigate('/'), 1000);
        toast.success('Congrats🎉, Submitted Successfully');
      }
    );
  };
  return (
    <div>
      <div className="bg-custom-affiliate-bg pb-20">
        <Toaster />
        <NavBar actionButtons={defaultActionButton} />
        <section className="grid lg:grid-cols-2 justify-center items-center lg:w-[1000px] lg:mx-auto pt-4 px-4">
          <div className="text-center lg:text-left pb-4 lg:pb-0">
            <h2 className="text-custom-black-900 font-headingFont text-3xl md:text-4xl lg:text-6xl font-semibold">
              BigShelf, BigEarnings.{' '}
            </h2>
            <p className="text-custom-text-body font-bodyRegularFont md:text-balance md:px-10 py-3 lg:px-0 text-base md:text-xl">
              Join our affiliate program and earn passive income effortlessly.
              BigShelf rewards you with 20% of profits from book sales generated
              through your referrals.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="relative">
              <img
                className="w-[300px] lg:w-[552px] relative"
                src={AffiliateHeroImg}
                alt="Hero image for Affiliate Page"
              />
              <div className="hidden lg:block absolute top-[10%] right-1/2">
                <CreditCard price={4550} />
              </div>
              <div className="hidden lg:block absolute top-[50%] right-1/2">
                <CreditCard price={750} />
              </div>
              <div className="hidden lg:block absolute top-[30%] -left-2">
                <CreditCard price={1500} />
              </div>
              <div className="absolute top-[75%] -left-2">
                <CreditCard price={2200} />
              </div>
            </div>
          </div>
        </section>
      </div>
      <section className="bg-custom-black-50 py-[50px] lg:py-[100px] px-4 lg:px-0">
        <Card
          className={`${styles.card_width} flex flex-col w-auto justify-center items-center mx-4 lg:mx-auto lg:w-[700px]`}
        >
          <Toaster />
          <CardHeader className="grid text-center">
            <CardTitle className="font-bold text-base lg:text-3xl font-headingFont">
              Apply to unlock a new revenue stream
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <Carousel className={`${styles.carousel_width} w-auto`}>
                    <CarouselContent>
                      <CarouselItem>
                        <div className="p-1">
                          <Card>
                            <CardContent className="flex p-6">
                              <div className="flex flex-col gap-4 w-full">
                                <InputControl
                                  control={form.control}
                                  name="full_name"
                                  label="Full name"
                                  placeholder="Enter your full name"
                                />

                                <InputControl
                                  control={form.control}
                                  name="email"
                                  label="Email"
                                  placeholder="Enter your email address"
                                />
                                <InputControl
                                  control={form.control}
                                  name="phone_number"
                                  label="Phone number"
                                  placeholder="09089344163"
                                />

                                <TextAreaControl
                                  control={form.control}
                                  name="why_you_are_applying"
                                  label=" Why do you want to join our BigEarning
                                        program ?"
                                  placeholder="I want to join the program because..."
                                  rows={3}
                                />
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>
                      <CarouselItem>
                        <div className="p-1">
                          <Card>
                            <CardContent className="flex p-6">
                              <div className="flex flex-col gap-4 w-full">
                                <InputControl
                                  control={form.control}
                                  name="country"
                                  label="Country"
                                  placeholder="Enter country"
                                />

                                <InputControl
                                  control={form.control}
                                  name="state"
                                  label="State"
                                  placeholder="Enter your state"
                                />

                                <SelectControl
                                  control={form.control}
                                  name="have_a_hub"
                                  label="Do you own a hub/shop"
                                  placeholder="Select either Yes or No"
                                  options={[
                                    { value: 'no', label: 'No' },
                                    { value: 'yes', label: 'Yes' },
                                  ]}
                                />
                                <TextAreaControl
                                  control={form.control}
                                  name="hub_address"
                                  label="Hub/Shop address"
                                  placeholder="I'm currently located at..."
                                  rows={3}
                                />
                                <div className="flex justify-center">
                                  <Button
                                    type="submit"
                                    className="w-[225px] bg-custom-black-900 py-[14px] font-poppinsFont lg:text-lg"
                                  >
                                    {isLoading ? (
                                      <ClipLoader color="#fff" size={24} />
                                    ) : (
                                      'Submit Application'
                                    )}
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious variant="default" />
                    <CarouselNext variant="default" />
                  </Carousel>
                </form>
              </Form>
            </div>
          </CardContent>
        </Card>
      </section>
      {/* Testimonial */}
      <section className="testimonial-linear-bg lg:pb-[100px] flex flex-col justify-center items-center">
        <section className="py-[100px]">
          <Text
            header={
              <>
                Feel the <span className="text-custom-secondary">BigLove</span>,
                Hear from Our Community.
              </>
            }
          >
            Don’t just take our word for it, hear what others have to say.
          </Text>
        </section>
        <Testimonial />
      </section>
      {/* Footer */}
      <footer className="lg:flex lg:justify-center pt-[150px]">
        <Footer />
      </footer>
    </div>
  );
};

export default AffliatePage;
