
export const Button = ({onClick, children}: {onClick: () => void, children:React.ReactNode})=>{
    return <button onClick={(onClick)} className='py-2 px-4 text-2xl bg-red-600 hover:bg-blue-700 text-white 
    font-bold  rounded'>{children}</button>
}