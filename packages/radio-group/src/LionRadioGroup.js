import { LionFieldset } from '@lion/fieldset';

/**
 * LionRadioGroup: extends the lion-fieldset
 *
 * <lion-radio-group>
 *   <label slot="label">My Radio</label>
 *   <lion-radio name="name[]">
 *     <label slot="label">Male</label>
 *   </lion-radio>
 *   <lion-radio name="name[]">
 *     <label slot="label">Female</label>
 *   </lion-radio>
 * </lion-radio-group>
 *
 * You can preselect an option by setting marking an lion-radio checked.
 *   Example:
 *   <lion-radio name="name[]" checked>
 *
 * It extends LionFieldset so it inherits it's features.
 *
 *
 * @customElement
 * @extends LionFieldset
 */

export class LionRadioGroup extends LionFieldset {
  get checkedValue() {
    const el = this._getCheckedRadioElement();
    return el ? el.modelValue.value : '';
  }

  set checkedValue(value) {
    this._setCheckedRadioElement(value, (el, val) => el.modelValue.value === val);
  }

  get serializedValue() {
    const el = this._getCheckedRadioElement();
    return el ? el.serializedValue : '';
  }

  set serializedValue(value) {
    this._setCheckedRadioElement(value, (el, val) => el.serializedValue === val);
  }

  get formattedValue() {
    const el = this._getCheckedRadioElement();
    return el ? el.formattedValue : '';
  }

  set formattedValue(value) {
    this._setCheckedRadioElement(value, (el, val) => el.formattedValue === val);
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('model-value-changed', this._checkRadioElements);
    this._setRole('radiogroup');
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('model-value-changed', this._checkRadioElements);
  }

  _checkRadioElements(ev) {
    const { target } = ev;
    if (target.type !== 'radio' || target.checked === false) return;

    const groupName = target.name;
    this.formElementsArray
      .filter(i => i.name === groupName)
      .forEach(radio => {
        if (radio !== target) {
          radio.checked = false; // eslint-disable-line no-param-reassign
        }
      });
    this.__triggerCheckedValueChanged();
  }

  _getCheckedRadioElement() {
    const filtered = this.formElementsArray.filter(el => el.checked === true);
    return filtered.length > 0 ? filtered[0] : undefined;
  }

  _setCheckedRadioElement(value, check) {
    for (let i = 0; i < this.formElementsArray.length; i += 1) {
      if (check(this.formElementsArray[i], value)) {
        this.formElementsArray[i].checked = true;
        return;
      }
    }
  }

  _onFocusOut() {
    this.touched = true;
    this.focused = false;
  }

  __triggerCheckedValueChanged() {
    const value = this.checkedValue;
    if (value != null && value !== this.__previousCheckedValue) {
      this.dispatchEvent(
        new CustomEvent('checked-value-changed', { bubbles: true, composed: true }),
      );
      this.touched = true;
      this.__previousCheckedValue = value;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  __isRequired(modelValue) {
    const groupName = Object.keys(modelValue)[0];
    const filtered = modelValue[groupName].filter(node => node.checked === true);
    const value = filtered.length > 0 ? filtered[0] : undefined;
    return {
      required:
        (typeof value === 'string' && value !== '') ||
        (typeof value !== 'string' && typeof value !== 'undefined'), // TODO: && value !== null ?
    };
  }
}
