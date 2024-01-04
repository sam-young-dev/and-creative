import { getCurrencyFromCode } from "~/use-cases/contracts/Currency";

export const Price: React.FC<{
  children: number;
  currencyCode: string;
  className?: string;
}> = ({ children, className = '', currencyCode }) => {
  const currency = getCurrencyFromCode(currencyCode);

  const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.code,
      minimumFractionDigits: 2,
      maximumFractionDigits: 5,
  });

  return <span className={`crystallize-price ${className}`}>{formatter.format(children)}</span>;
};