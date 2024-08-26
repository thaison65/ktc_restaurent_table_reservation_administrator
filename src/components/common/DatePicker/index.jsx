import DatePicker from 'react-datepicker';

import { dateSVGIcon } from '~/assets/icons';

import 'react-datepicker/dist/react-datepicker.css';
import './DatePicker.scss';

function DatePickerComponent({ ...props }) {
  const { startDate, handleChangeDate } = props;

  return (
    <>
      <div id='container-date'>
        <label htmlFor='date'>Ngày:</label>
        <DatePicker showIcon minDate={new Date()} selected={startDate} dateFormat='dd/MM/yyyy' onChange={handleChangeDate} icon={dateSVGIcon} />
      </div>
    </>
  );
}

export default DatePickerComponent;
