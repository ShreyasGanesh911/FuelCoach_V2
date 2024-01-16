export default function Auth() {
    const token = localStorage.getItem("Auth")
    if(token)
        return true
    else
        return false
}
