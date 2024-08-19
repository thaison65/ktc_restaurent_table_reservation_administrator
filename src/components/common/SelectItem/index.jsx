import './SelectItem.scss'; // Import CSS file for styling

function SelectArea({ ...props }) {
  const { title, options, onSelect, selectedValue } = props;

  return (
    <div className='select-area-container'>
      <label htmlFor='select-area' className='select-area-label'>
        {title}
      </label>
      <div className='select-area-wrapper'>
        <select id='select-area' className='select-area' value={selectedValue} onChange={onSelect}>
          {options.map((category) => (
            <option key={category.id} value={category.id}>
              {category.title}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default SelectArea;
