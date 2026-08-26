import { useState } from 'react';
import { Field } from '../../components/shared';
import { currencyForCountry } from '../../data/constants';

export default function BudgetCalculator({ country }) {
  const [money, setMoney] = useState(1850);
  const [days, setDays] = useState(30);
  const [expenses, setExpenses] = useState(200);
  const usable = Math.max(0, Number(money || 0) - Number(expenses || 0));
  const daily = Number(days) > 0 ? usable / Number(days) : 0;
  const { symbol, code } = currencyForCountry(country);

  return (
    <div className="skc-card p-4 space-y-3">
      <p className="text-sm font-semibold skc-navy skc-body">Student Budget</p>
      <p className="text-3xs skc-muted skc-body -mt-2">Currency: {symbol} ({code}) — based on your country of study</p>
      <Field label={`Available money (${symbol})`} input value={money} onChange={setMoney} />
      <div className="grid grid-cols-2 gap-2">
        <Field label="Days remaining" input value={days} onChange={setDays} />
        <Field label={`Fixed expenses (${symbol})`} input value={expenses} onChange={setExpenses} />
      </div>
      <div className="skc-bg-tealtint rounded-xl p-3 text-center">
        <p className="text-2xs skc-teal skc-body font-medium mb-1">Suggested daily spend</p>
        <p className="text-2xl font-bold skc-navy skc-mono">{symbol}{daily.toFixed(0)}</p>
      </div>
    </div>
  );
}
