import Text from '../components/Text';
import { motion } from 'framer-motion';
import {
  onScrollAnimationConfigs,
  // onScrollAnimationConfigsSingle,
} from '../constants/config.ts';
import NavBar from '@/components/NavBar.tsx';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button.tsx';
import Footer from '@/components/Footer.tsx';
import { useEffect } from 'react';
const ShippingPolicy = () => {
  const defaultActionButton = (
    <Link to="/">
      <Button className="w-[248px] h-[48px] text-white text-lg font-bold font-bodyBoldFont px-[16px] py-[13px] bg-custom-black-900 rounded-[12px]">
        Place an order
      </Button>
    </Link>
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <motion.div
      variants={onScrollAnimationConfigs.containerVariants}
      initial={onScrollAnimationConfigs.initial}
      whileInView={onScrollAnimationConfigs.whileInView}
      viewport={onScrollAnimationConfigs.viewport}
      className="bg-custom-header-bg overflow-y-auto bg-white"
    >
      <div className="flex flex-col gap-12 lg:gap-16 text-left ">
        <NavBar actionButtons={defaultActionButton} />
        <div className="max-w-[1000px] mx-auto mt-20">
          <Text header="BigShelf Shipping Policy" className="mt-10">
            At BigShelf, we work hard to make sure your books get to you fast,
            at a fair price, and without problems, no matter where you are in
            Nigeria.
          </Text>

          <motion.div variants={onScrollAnimationConfigs.containerVariants}>
            <h3 className="mt-10 font-extrabold text-custom-text-body font-bodyRegularFont text-base md:text-2xl">
              Shipping Coverage
            </h3>
            <Text header="" className="mt-0">
              We currently ship nationwide within Nigeria using trusted
              third-party logistics partners to ensure your books arrive safely
              and on time.
            </Text>
          </motion.div>

          <motion.div variants={onScrollAnimationConfigs.containerVariants}>
            <h3 className="mt-10 font-extrabold text-custom-text-body font-bodyRegularFont text-base md:text-2xl">
              Processing Time
            </h3>
            <Text header="" className="mt-0">
              After we confirm your payment, we will get your order ready to
              ship within 24 to 48 hours. If you place your order during a
              weekend or public holiday, we’ll start processing it on the next
              working day.
            </Text>
          </motion.div>

          <motion.div variants={onScrollAnimationConfigs.containerVariants}>
            <motion.h3
              variants={onScrollAnimationConfigs.containerVariants}
              className="mt-10 font-extrabold text-custom-text-body font-bodyRegularFont text-base md:text-2xl"
            >
              Delivery Timeline
            </motion.h3>

            <Text header="" className="mt-0">
              For customers in Lagos and other major cities, delivery typically
              takes between 2 to 4 business days. For those in other states or
              remote areas, delivery may take between 3 to 7 business days. Once
              your order is shipped, you will receive a tracking link via email
              or SMS.
            </Text>
          </motion.div>

          <motion.div variants={onScrollAnimationConfigs.containerVariants}>
            <motion.h3
              variants={onScrollAnimationConfigs.containerVariants}
              className="mt-10 font-extrabold text-custom-text-body font-bodyRegularFont text-base md:text-2xl"
            >
              Shipping Fees
            </motion.h3>
            <Text header="" className="mt-0">
              Shipping costs are calculated at checkout and depend on your
              delivery location and the size of your order. We offer 50% off the
              delivery cost for orders above ₦20,000 and free delivery for
              orders above ₦40,000. Occasionally, we run promotional offers that
              may include free shipping for selected items or minimum order
              values.
            </Text>
          </motion.div>

          <motion.div variants={onScrollAnimationConfigs.containerVariants}>
            <motion.h3
              variants={onScrollAnimationConfigs.containerVariants}
              className="mt-10 font-extrabold text-custom-text-body font-bodyRegularFont text-base md:text-2xl"
            >
              Tracking Your Order
            </motion.h3>
            <Text header="" className="mt-0">
              You can track the progress of your order at any time by visiting
              <a
                href="https://mybigshelf.com/tracker"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary"
              >
                {' '}
                mybigshelf.com/tracker
              </a>
              . Tracking information becomes available once your order is
              confirmed.
            </Text>
          </motion.div>

          <motion.div variants={onScrollAnimationConfigs.containerVariants}>
            <motion.h3
              variants={onScrollAnimationConfigs.containerVariants}
              className="mt-10 font-extrabold text-custom-text-body font-bodyRegularFont text-base md:text-2xl"
            >
              Missed Deliveries
            </motion.h3>

            <Text header="" className="mt-0">
              If a delivery attempt is unsuccessful, our logistics partner will
              contact you to arrange a new delivery time. If two delivery
              attempts fail, your order may be returned to us, and additional
              charges may apply for redelivery.
            </Text>
          </motion.div>

          <motion.div variants={onScrollAnimationConfigs.containerVariants}>
            <motion.h3
              variants={onScrollAnimationConfigs.containerVariants}
              className="mt-10 font-extrabold text-custom-text-body font-bodyRegularFont text-base md:text-2xl"
            >
              Damaged or Lost Items
            </motion.h3>

            <Text header="" className="mt-0">
              If your item arrives damaged or is not delivered within the
              expected time frame, please reach out to our support team within 3
              days of the expected delivery date so we can resolve the issue
              promptly.
            </Text>
          </motion.div>

          <motion.div variants={onScrollAnimationConfigs.containerVariants}>
            <motion.h3
              variants={onScrollAnimationConfigs.containerVariants}
              className="mt-10 font-extrabold text-custom-text-body font-bodyRegularFont text-base md:text-2xl"
            >
              Contact Us
            </motion.h3>

            <Text header="" className="mt-0">
              For help with shipping or delivery questions, you can contact us
              by email at{' '}
              <a
                href="mailto:kingslee@mybigshelf.com"
                className="text-secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                kingslee@mybigshelf.com
              </a>{' '}
              or call us on +(234) 913 415 2730. We’re committed to making sure
              your reading experience starts off right, with smooth delivery and
              clear updates every step of the way.
            </Text>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="lg:flex lg:justify-center pt-[150px]">
        <Footer />
      </footer>
    </motion.div>
  );
};

export default ShippingPolicy;
