import { Link } from 'react-router-dom';
import { Button } from './ui/button';

interface Text {
  title: string;
  link: string;
}
interface Props {
  heading: string;
  text1?: Text;
  text2?: Text;
  text3?: Text;
}

const FooterText = ({ heading, text1, text2, text3 }: Props) => {
  return (
    <div className="flex flex-col gap-2 font-bodyRegularFont">
      <p className="text-custom-text-primary font-bodyBoldFont font-bold text-xl">
        {heading}
      </p>
      {text1 && (
        <Link to={text1.link}>
          <Button
            variant="link"
            className="text-custom-text-body text-lg p-0 m-0 justify-start"
          >
            {text1.title}
          </Button>
        </Link>
      )}
      {text2 && (
        <Link to={text2.link}>
          <Button
            variant="link"
            className="text-custom-text-body text-lg p-0 m-0 justify-start"
          >
            {text2.title}
          </Button>
        </Link>
      )}
      {text3 && (
        <Link to={text3.link}>
          <Button
            variant="link"
            className="text-custom-text-body text-lg p-0 m-0 justify-start"
          >
            {text3.title}
          </Button>
        </Link>
      )}
    </div>
  );
};

export default FooterText;
