import './SelectItem.scss'; // Import CSS file for styling

function SelectArea({ categories, onSelect, selectedValue }) {
  return (
    <div className='select-area-container'>
      <label htmlFor='select-area' className='select-area-label'>
        Chọn khu vực:
      </label>
      <div className='select-area-wrapper'>
        <select id='select-area' className='select-area' value={selectedValue} onChange={onSelect}>
          {categories.map((category) => (
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
