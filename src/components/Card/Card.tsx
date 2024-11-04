import "./card.css";

type Props = {
  className?: string;
};

export function Card({ className = "" }: Props) {
  return <div className={`card ${className}`}>{}</div>;
}
