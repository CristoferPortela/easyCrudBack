module.exports = app => {

    const emailValidate = (email, msg) => {
        
        const reg = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/
        
        if(!email.match(reg))
            throw msg
        return true
    }

    const notNull = (sub, msg) => {
        if (sub == null)
            throw msg
        return true
    }

    return { emailValidate, notNull }

}