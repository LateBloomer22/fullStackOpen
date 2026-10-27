function validator(value){
    const regex = new RegExp("^[0-9]{2,3}-[0-9]{5,}$", "i" )
    return regex.test(value)
}

console.log(validator('040-1234556'));

console.log(validator('1-22334455'));
