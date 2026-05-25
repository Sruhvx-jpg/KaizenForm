import { trpc } from "~/trpc/client";



export const useSignup = () => {
    const { mutateAsync: regUserViaEmailPassAsync
        , mutate: regUserViaEmailPass,
        error,
        isError,
        isSuccess,
        status,
        failureCount,
        isIdle,
    } = trpc.auth.regUserViaEmailPass.useMutation();

    return {
        regUserViaEmailPassAsync,
        regUserViaEmailPass,
        error,
        isError,
        isIdle,
        failureCount
    }
}

export const useLogin = () => {
    const { mutateAsync: loginUserViaEmailPassAsync, 
        mutate: loginUserViaEmailPass,
        error,
        isError,
        isSuccess,
        status,
        failureCount,
        isIdle,
    } = trpc.auth.regUserViaEmailPass.useMutation();

    return {
        loginUserViaEmailPassAsync,
        loginUserViaEmailPass,
        error,
        isError,
        isIdle,
        failureCount
    }
}

