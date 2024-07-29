import React, { Component } from 'react';
import { bool, func, object, shape, string } from 'prop-types';
import { Field } from 'react-final-form';
import classNames from 'classnames';
import { ValidationError, ExpandingTextarea } from '../../components';
import config from '../../config';
import css from './FieldTextInput.module.css';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { IoCopyOutline } from 'react-icons/io5';
import ReactTooltip from 'react-tooltip';

const CONTENT_MAX_LENGTH = 5000;

class FieldTextInputComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'password',
      copied: false,
    };
  }

  render() {
    /* eslint-disable no-unused-vars */
    const {
      rootClassName,
      className,
      inputRootClass,
      customErrorText,
      id,
      label,
      input,
      meta,
      onUnmount,
      isUncontrolled,
      inputRef,
      hideErrorMessage,
      onfieldBlur,
      pricingInput,
      variant,
      ...rest
    } = this.props;
    /* eslint-enable no-unused-vars */

    if (label && !id) {
      throw new Error('id required when a label is given');
    }

    const { valid, invalid, touched, error } = meta;
    const isTextarea = input.type === 'textarea';

    const errorText = customErrorText || error;

    // Error message and input error styles are only shown if the
    // field has been touched and the validation has failed.
    const hasError = !!customErrorText || !!(touched && invalid && error);

    const fieldMeta = { touched: hasError, error: errorText };

    // Textarea doesn't need type.
    const { type, ...inputWithoutType } = input;
    // Uncontrolled input uses defaultValue instead of value.
    const { value: defaultValue, ...inputWithoutValue } = input;
    // Use inputRef if it is passed as prop.
    const refMaybe = inputRef ? { ref: inputRef } : {};

    const inputClasses =
      inputRootClass ||
      classNames(css.input, {
        [css.inputSuccess]: valid,
        [css.inputError]: hasError,
        [css.textarea]: isTextarea,
      });
    const maxLength = CONTENT_MAX_LENGTH;
    const inputProps = isTextarea
      ? {
          className: inputClasses,
          id,
          rows: 1,
          maxLength,
          ...refMaybe,
          ...inputWithoutType,
          ...rest,
        }
      : isUncontrolled
      ? {
          className: inputClasses,
          id,
          type,
          defaultValue,
          ...refMaybe,
          ...inputWithoutValue,
          ...rest,
        }
      : {
          className: pricingInput ? css.pricingClass : inputClasses,
          id,
          type,
          ...refMaybe,
          ...input,
          ...rest,
        };

    const classes = classNames(rootClassName || css.root, className);

    const onCopy = () => {
      navigator.clipboard.writeText(input.value).then(res => {
        this.setState({ copied: true });
      });
    };

    const onResetCopy = () => this.setState({ copied: false });
    const copyMessage = this.state.copied ? 'Copied!' : 'Copy';

    if (variant == 'copy') {
      return (
        <div className={classes}>
          {label ? <label htmlFor={id}>{label}</label> : null}
          <div className="relative">
            <input {...inputProps} />
            <button
              onClick={onCopy}
              type="button"
              className="outline-0 border-0 p-0 absolute right-0 top-1/2 -translate-y-1/2 hover:cursor-pointer hover:text-black"
              data-for="copy"
              data-tip=""
              onMouseLeave={onResetCopy}
            >
              <IoCopyOutline />
              <ReactTooltip
                className={css.copyTooltip}
                id="copy"
                uuid="copy"
                place="bottom"
                getContent={() => {
                  return null;
                }}
              >
                {copyMessage}
              </ReactTooltip>
            </button>
          </div>

          <div>
            <ValidationError fieldMeta={fieldMeta} />
          </div>
        </div>
      );
    }

    return (
      <div className={classes}>
        {label ? <label htmlFor={id}>{label}</label> : null}
        {isTextarea ? (
          <ExpandingTextarea {...inputProps} />
        ) : inputProps.type == 'password' ? (
          <div className="flex relative">
            <input
              {...inputProps}
              onBlur={e => {
                inputProps.onBlur(e);
                if (onfieldBlur) {
                  onfieldBlur(e);
                }
              }}
              type={this.state.type}
            />
            <button
              type="button"
              role="button"
              aria-labelledby="show hide password buttton"
              className="border-none absolute z-10 right-0 cursor-pointer inline-block"
              onClick={() => {
                this.setState({ type: this.state.type == 'password' ? 'text' : 'password' });
              }}
            >
              {this.state.type == 'text' ? (
                <AiFillEye className="text-lg text-gray-900" />
              ) : (
                <AiFillEyeInvisible className="text-lg text-gray-500 hover:text-gray-900" />
              )}
            </button>
          </div>
        ) : pricingInput ? (
          <>
            <img
              className={hasError ? css.textboxError : css.textbox}
              src={config.custom.suneCurrencySymbolBlack}
              style={{ width: '10px', marginBottom: '2px' }}
              alt="Sune Currency Symbol"
            />
            <input {...inputProps} />
          </>
        ) : (
          <input {...inputProps} />
        )}
        <div>
          <ValidationError fieldMeta={fieldMeta} />
        </div>
      </div>
    );
  }
}

FieldTextInputComponent.defaultProps = {
  rootClassName: null,
  className: null,
  inputRootClass: null,
  onUnmount: null,
  customErrorText: null,
  id: null,
  label: null,
  isUncontrolled: false,
  inputRef: null,
};

FieldTextInputComponent.propTypes = {
  rootClassName: string,
  className: string,
  inputRootClass: string,

  onUnmount: func,

  // Error message that can be manually passed to input field,
  // overrides default validation message
  customErrorText: string,

  // Label is optional, but if it is given, an id is also required so
  // the label can reference the input in the `for` attribute
  id: string,
  label: string,

  // Uncontrolled input uses defaultValue prop, but doesn't pass value from form to the field.
  // https://reactjs.org/docs/uncontrolled-components.html#default-values
  isUncontrolled: bool,
  // a ref object passed for input element.
  inputRef: object,

  // Generated by final-form's Field component
  input: shape({
    onChange: func.isRequired,
    // Either 'textarea' or something that is passed to the input element
    type: string.isRequired,
  }).isRequired,
  meta: object.isRequired,
};

class FieldTextInput extends Component {
  componentWillUnmount() {
    // Unmounting happens too late if it is done inside Field component
    // (Then Form has already registered its (new) fields and
    // changing the value without corresponding field is prohibited in Final Form
    if (this.props.onUnmount) {
      this.props.onUnmount();
    }
  }

  render() {
    return <Field component={FieldTextInputComponent} {...this.props} />;
  }
}

export default FieldTextInput;
