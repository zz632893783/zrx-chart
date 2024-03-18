export const setMaxVal = val => {
    const bit = Math.floor(Math.log10(val)) - 1;
    val = Math.floor(val / Math.pow(10, bit)) + 1;
    return val * Math.pow(10, bit);
};

// 这段不是我写的
export const setFixed = (value, toFixedNum = 2) => {
    if (!value) return value
    let flag = ''
    if (Number(value) < 0) {
        flag = '-'
    }
    if (!Math.abs(value)) return flag + value
    // console.log('value', value, String(value).split('.').length)
    if (String(value).split('.').length > 1) {
        // return (value = Number(value).toFixed(toFixedNum))
        const arr = String(value).split('.')
        const integer = Math.abs(arr[0])
        const decimal = arr[1] || '0'
        // console.log('decimal', arr, decimal)
        if (decimal?.length == toFixedNum) return value
        value = Math.abs(value)
        let res = value.toString()
        if (decimal?.length < toFixedNum) {
            for (let i = 0; i < toFixedNum - decimal.length; i += 1) {
                res += '0'
            }
            return flag + res
        }

        res = toFixedNum > 0 ? integer + '.' + decimal?.substr(0, toFixedNum) : integer;
        const last = decimal.substr(toFixedNum, 1);
        // 四舍五入，转换为整数再处理，避免浮点数精度的损失
        if (parseInt(last, 10) >= 5) {
            const x = Math.pow(10, toFixedNum)
            res = (Math.round((parseFloat(res) * x)) + 1) / x
            res = res.toFixed(toFixedNum)
        }
        return flag + res
    }
    return flag + Math.abs(value)
};