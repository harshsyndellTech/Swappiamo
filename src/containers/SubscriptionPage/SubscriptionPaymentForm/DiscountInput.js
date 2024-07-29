import React from 'react';

function DiscountInput(props) {
  const { onClick, discountError, discountResponse, ...rest } = props;

  let message = null;

  if (discountResponse != null) {
    switch (discountResponse.duration) {
      case 'forever':
        message = `Forever`;
        break;
      case 'once':
        message = `First month`;
        break;
      case 'repeating':
        message = `${discountResponse.duration_in_months} months`;
        break;
    }
  }

  return (
    <div>
      <label htmlFor="discount">Discount Code</label>
      <div className="flex rounded-md  mt-2 discount-container overflow-hidden">
        <input
          type="text"
          className="col-span-3 px-4 discount-input"
          placeholder="e.g., DISCOUNT10"
          {...rest}
          name="discount"
          id="discount"
        />
        <button
          onClick={onClick}
          disabled={!props.value}
          type="button"
          className="discount-button px-6 text-white cursor-pointer disabled:bg-gray-300  hover:bg-blue-500 transition ease-in-out delay-150 bg-blue-400 border-1  hover:border-blue-500 border-blue-400 disabled:border-gray-300 border-solid font-bold uppercase"
        >
          Apply
        </button>
      </div>
      {discountError && <p className="text-red-500 my-0">{discountError}</p>}
      {discountResponse && (
        <div className="text-green-500 my-0">
          <p className="my-0 leading-snug mt-2">{discountResponse.message}</p>
          <p className="my-0 leading-snug">Validity: {message}</p>
        </div>
      )}
    </div>
  );
}

export default DiscountInput;
