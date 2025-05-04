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

const ReturnPolicy = () => {
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
          <Text header="BigShelf Return & Refund Policy" className="mt-10">
            At BigShelf, we want you to be completely satisfied with your
            purchase. If for any reason you are not satisfied, we’re here to
            help.
          </Text>

          <motion.div variants={onScrollAnimationConfigs.containerVariants}>
            <h3 className="mt-10 font-extrabold text-custom-text-body font-bodyRegularFont text-base md:text-2xl">
              1. Eligibility for Refunds
            </h3>
            <Text header="" className="mt-0">
              <span className="font-bold underline">
                Damaged or Defective Items:
              </span>{' '}
              If you receive a damaged, defective, or incorrect item, you may
              request a return.
            </Text>
            <Text header="" className="mt-0">
              <span className="font-bold underline">Unopened and Unused:</span>{' '}
              Books must be returned in their original condition, unopened and
              unused.
            </Text>
            <Text header="" className="mt-0">
              <span className="font-bold underline">Time Frame: </span> Returns
              must be initiated within 7 days of delivery date. The delivery
              date is the day your tracking status shows "Delivered".
            </Text>
          </motion.div>

          <motion.div variants={onScrollAnimationConfigs.containerVariants}>
            <h3 className="mt-10 font-extrabold text-custom-text-body font-bodyRegularFont text-base md:text-2xl">
              2. Non-Refundable Items
            </h3>
            <Text header="" className="mt-0">
              <ul className="list-disc list-inside ml-4">
                <li className="text-custom-text-body font-bodyRegularFont">
                  Digital products (e-books, audiobooks)
                </li>
                <li className="text-custom-text-body font-bodyRegularFont">
                  Clearance or deeply discounted items
                </li>
                <li className="text-custom-text-body font-bodyRegularFont">
                  Custom or special-order products
                </li>
              </ul>
            </Text>
          </motion.div>

          <motion.div variants={onScrollAnimationConfigs.containerVariants}>
            <motion.h3
              variants={onScrollAnimationConfigs.containerVariants}
              className="mt-10 font-extrabold text-custom-text-body font-bodyRegularFont text-base md:text-2xl"
            >
              3. How to Request a Refund
            </motion.h3>
            <Text header="" className="mt-0">
              <span className="font-bold underline">Contact Support: </span>{' '}
              Email us at{' '}
              <span className="text-custom-secondary">
                kingslee@mybigshelf.com
              </span>{' '}
              with your order number, photos of the book’s condition, and reason
              for return.
            </Text>
            <Text header="" className="mt-0">
              <span className="font-bold underline">Return Authorization:</span>{' '}
              Our team will review your request and, if approved, provide you
              with a Return Authorization (RA) number and shipping instructions.
            </Text>
            <Text header="" className="mt-0">
              <span className="font-bold underline">Ship Back:</span> Pack the
              book securely, include the RA number inside, and ship to the
              address provided. Inspection: Once we receive and inspect the
              return, we will notify you of the approval or rejection of your
              refund.
            </Text>
          </motion.div>

          <motion.div variants={onScrollAnimationConfigs.containerVariants}>
            <motion.h3
              variants={onScrollAnimationConfigs.containerVariants}
              className="mt-10 font-extrabold text-custom-text-body font-bodyRegularFont text-base md:text-2xl"
            >
              4. Refunds & Exchanges
            </motion.h3>
            <Text header="" className="mt-0">
              <span className="font-bold underline">Refunds: </span> Approved
              returns will be refunded to the original payment method within 5
              business days of inspection.
            </Text>
            <Text header="" className="mt-0">
              <span className="font-bold underline"> Exchanges:</span> If you
              would like to exchange for the same title, please indicate this in
              your return request. Exchanges are subject to availability.
            </Text>
            <Text header="" className="mt-0">
              <span className="font-bold underline">
                Late or Missing Refunds:
              </span>{' '}
              If you haven’t received a refund after 7 business days of our
              approval, please check your bank account and contact us if needed.
            </Text>
          </motion.div>

          <motion.div variants={onScrollAnimationConfigs.containerVariants}>
            <motion.h3
              variants={onScrollAnimationConfigs.containerVariants}
              className="mt-10 font-extrabold text-custom-text-body font-bodyRegularFont text-base md:text-2xl"
            >
              5. Shipping Costs
            </motion.h3>
            <Text header="" className="mt-0">
              <span className="font-bold underline">Return Shipping: </span> For
              approved returns due to our error (damaged, defective, or
              incorrect items), BigShelf will cover return shipping costs.
            </Text>
            <Text header="" className="mt-0">
              <span className="font-bold underline">
                {' '}
                Customer-Paid Returns:
              </span>{' '}
              If the return is due to change of mind or non-defective items, the
              customer is responsible for return shipping.
            </Text>
          </motion.div>

          <motion.div variants={onScrollAnimationConfigs.containerVariants}>
            <motion.h3
              variants={onScrollAnimationConfigs.containerVariants}
              className="mt-10 font-extrabold text-custom-text-body font-bodyRegularFont text-base md:text-2xl"
            >
              6. Contact Us
            </motion.h3>
            <Text header="" className="mt-0">
              For any questions or to start a return, reach out to:
            </Text>
            <Text header="" className="mt-0">
              <span className="font-bold underline"> Email:</span>{' '}
              kingslee@mybigshelf.com
            </Text>
            <Text header="" className="mt-0">
              <span className="font-bold underline"> Phone:</span> +(234) 913
              415 2730
            </Text>
            <Text header="" className="mt-0">
              Thank you for shopping with BigShelf! We’re committed to
              delivering a great reading experience.
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

export default ReturnPolicy;
