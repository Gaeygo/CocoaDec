const checkNumber = (number) => {
    const numberRegex = /^\+2340?[0-9]{10}+$/g
    numberRegex.test(number)
}



export default checkNumber