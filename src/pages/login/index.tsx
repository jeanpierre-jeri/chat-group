import Image from "next/image"

const Login = () => {
  return (
    <div className="h-full bg-gradient-to-tl  w-full py-16 px-4">
    <div className="flex flex-col items-center justify-center">
        <div className="bg-white shadow rounded lg:w-1/3  md:w-1/2 w-full p-10 mt-16">
            <p  className="focus:outline-none text-3xl font-extrabold leading-6 text-gray-800 text-center">Login to Chat</p>
            <p  className="focus:outline-none text-base mt-4 font-medium leading-none text-gray-500 text-center">Dont have account? </p>
            <div className="mt-18 flex flex-col gap-3">

            <button aria-label="Continue with google" role="button" className="focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full mt-10">
               <Image src={'https://tuk-cdn.s3.amazonaws.com/can-uploader/sign_in-svg2.svg'} width={19} height={20} alt="google" />
                <p className="text-base font-medium ml-4 text-gray-700">Continue with Google</p>
            </button>
            <button aria-label="Continue with github" role="button" className="focus:outline-none  focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full mt-4">
               <Image src={'https://tuk-cdn.s3.amazonaws.com/can-uploader/sign_in-svg3.svg'} width={19} height={20} alt="github" />

                <p className="text-base font-medium ml-4 text-gray-700">Continue with Github</p>
            </button>
            </div>
         
        </div>
    </div>
</div>

  )
}

export default Login
