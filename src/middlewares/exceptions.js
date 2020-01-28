module.exports = app => {

    const emailValidate = (email, msg) => {
        
        const reg = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/
        
        if(!email.match(reg))
            throw msg
    }

    const notNull = (sub,msg) => {
        if (sub == null)
            throw msg
    }

    return { emailValidate, notNull }

}