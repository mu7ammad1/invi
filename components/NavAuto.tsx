import Navbar from './nav'

export default function NavAuto() {
    return (
        <nav className="h-auto my-5 mb-10 flex justify-center items-center w-full *:max-w-full *:w-full px-10">
            <Navbar />
            {/* <div className="w-full flex justify-end items-center text-sm">
                {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
            </div> */}
        </nav>
    )
}
