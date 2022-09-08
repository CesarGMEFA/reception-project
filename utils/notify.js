import { toast } from 'react-hot-toast'

export function notifySucess() {
  return toast.success("sucessfully", {
    position: "bottom-right",
    style: {
      backgroundColor: 'rgb(113 113 122)',
      color: 'white'
    }
  })
}

export function notifyError() {
  return toast.error("unsuccessfull", {
    position: "bottom-right",
    style: {
      backgroundColor: 'rgb(113 113 122)',
      color: 'white'
    }
  })
}