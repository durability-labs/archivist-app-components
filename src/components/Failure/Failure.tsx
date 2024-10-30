import "./failure.css";
import { Button } from "../Button/Button";

type Props = {
  /**
   * Error code related to the error, example: 400, 500
   */
  code: number;

  message: string;

  title: string;

  /**
   * If an action function is passed to the component,
   * a button will be displayed and the function will be called when the button
   * is clicked.
   */
  onClick?: () => void | Promise<void>;

  /**
   * The button label
   */
  button?: string;
};

export function Failure({
  code,
  message,
  onClick,
  button = "Retry",
  title = "Something went wrong",
}: Props) {
  return (
    <div className="failure">
      <h1>{code}</h1>
      <h2>{title}</h2>
      <div>{message}</div>
      {onClick && <Button label={button} onClick={onClick} />}
    </div>
  );
}
