function checkRequired(val) {
  return !!val;
}
function checkLength(val, min, max) {
  return val.length > min && val.length <= max;
}

function checkCharacter(val) {
  const regex =
    /^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/;
  return regex.test(val);
}

function checkEmail(val) {
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(val);
}

function checkNumberPhone(val) {
  const regex = /^[0-9]+$/;
  return regex.test(val);
}

export { checkRequired, checkLength, checkCharacter, checkEmail, checkNumberPhone };
