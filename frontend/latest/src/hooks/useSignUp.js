import { QueryClient, useMutation } from '@tanstack/react-query'
import React from 'react'

function useSignUp() {
    const queryClient=useQueryClient()

    const {mutate:signupMutation,isPending,error}=useMutation({
    mutationFn:signup,
    onSuccess:()=>QueryClient.invalidateQueries({queryKey:["authUser"]})
  })
  return {signupMutation:mutate,isPending,error}
}



export default useSignUp
