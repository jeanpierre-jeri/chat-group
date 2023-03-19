import { GithubIcon, GoogleIcon } from "@/components/atoms"

const Login = () => {
  return (
    <div className="h-full bg-gradient-to-tl  w-full py-16 px-4">
    <div className="flex flex-col items-center justify-center">
        <div className="bg-primary shadow rounded lg:w-1/5 p-10 mt-16">
            <p  className="focus:outline-none text-3xl font-extrabold leading-6 text-white text-center">Login to Chat</p>
            <p  className="focus:outline-none text-lg mt-4 font-medium leading-none text-white text-center">Dont have account? </p>
            <div className="mt-18 flex flex-col gap-3">

            <button aria-label="Continue with google" role="button" className="focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full mt-10">
               <GoogleIcon />
                <p className="text-base font-medium ml-4 text-white">Continue with Google</p>
            </button>
            <button aria-label="Continue with github" role="button" className="focus:outline-none  focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full mt-4">
               <GithubIcon />
                <p className="text-base font-medium ml-4 text-white">Continue with Github</p>
            </button>
            </div>
         
        </div>
    </div>
</div>

  )
}

export default Login
