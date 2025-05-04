import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Faq = () => {
  const faqs = [
    {
      value: "item-1",
      trigger: "How can I track my order?",
      content: "Once your order is confirmed, you will receive a tracking number. You can use this number to track your order on our website by entering it in the tracking section.",
    },
    {
      value: "item-2",
      trigger: "What if I haven't received my order confirmation email?",
      content: "If you haven't received your order confirmation email within a few minutes of placing your order, please check your spam or junk folder. If it's not there, contact our customer service team via WhatsApp for assistance.",
    },
    {
      value: "item-3",
      trigger: "What are the possible order statuses?",
      content: "Your order can have the following statuses: Order Placed, Shipped, Out for Delivery, and Delivered. You can view the current status of your order in the tracking section of our website.",
    },
    {
      value: "item-4",
      trigger: "How long does it take to receive my order?",
      content: "Shipping times vary based on your location and the shipping method selected. Typically, standard shipping takes 3-7 business days. If the selected shipping method is “Book Haul”, your order will be delivered within a week after the date specified for the haul.",
    },
    {
      value: "item-5",
      trigger: "Can I change my shipping address after placing an order?",
      content: "If you need to change your shipping address, please contact our customer service team as soon as possible. We can update the address if the order has not yet been shipped.",
    },
    {
      value: "item-6",
      trigger: "What should I do if my order is delayed?",
      content: "If your order is delayed beyond the estimated delivery date, please check the tracking information for updates. If there are no updates or if you have concerns, contact our customer service team for assistance.",
    },
    {
      value: "item-7",
      trigger: "How do I report a missing or damaged item?",
      content: "If you receive a damaged item or if an item is missing from your order, please contact our customer service team within 7 days of receiving your order. We will assist you with a replacement or refund.",
    },
    {
      value: "item-8",
      trigger: "How can I contact customer service?",
      content: <p>You can contact our customer service team via email at <span className="text-custom-secondary">kingslee@mybigshelf.com</span>, or via WhatsApp at [+234 913 415 2730].</p>,
    },
  ];
  return (
    <div className="pt-[100px] lg:py-[100px] px-6 lg:px-0">
      <Accordion
        type="single"
        defaultValue="item-1"
        className="w-full lg:w-[800px]"
        collapsible
      >
        {faqs.map((faq) => (
          <AccordionItem
            key={faq.value}
            value={faq.value}
            className="border-black"
          >
            <AccordionTrigger className="text-custom-black-900 lg:py-5 text-left text-lg lg:text-xl xl:text-3xl font-headingFont font-semibold hover:no-underline">
              {faq.trigger}
            </AccordionTrigger>
            <AccordionContent className="text-custom-text-body font-bodyRegularFont text-base lg:text-xl">
              {faq.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Faq;
