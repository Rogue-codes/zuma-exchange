import React from 'react'
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { currencies } from './currencies'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

    function Home() {
        let myHeaders = new Headers();
        // const key = process.env.API_KEY
        myHeaders.append("apikey", 'Pn8M5QlaRlXTWoUkk30w2FmcyDiGytk7');

        let requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
        };


    const [selectedFrom, setSelectedFrom] = useState(currencies[3])
    const [selectedTo, setSelectedTo] = useState(currencies[2])
    const [amount, setAmmount] = useState('')
    const [val,setVal]=useState('')

    const handleSubmit =(e)=>{
        e.preventDefault();

        fetch(`https://api.apilayer.com/currency_data/convert?to=${selectedTo.name}&from=${selectedFrom.name}&amount=${amount}`, requestOptions)
        .then(response => response.json())
        .then(result => setVal(result.result))
        .catch(error => console.log('error', error));
        
    }

    const swapCurrency = () =>{
        setSelectedFrom(selectedTo)
        setSelectedTo(selectedFrom)
    }

  return (
    <div className="w-3/4 m-auto min-h-96 md:h-80  bg-indigo-500  p-2 relative">
        <form action="" onSubmit={handleSubmit}>
            <div className="flex flex-col mb-6 gap-9 items-center md:flex-row md:items-end ">
                    <div className="w-4/5 md:flex-1">
                        <label 
                            htmlFor="" 
                            className="font-bold text-sm mb-3 block"
                        >
                            Amount
                        </label>
                        <input
                            type="text"
                            className="focus:outline-none focus:ring-1 focus:border-white w-full border-2 rounded-sm min-h-50 pl-3 pr-10 py-2"
                            value={amount}
                            onChange={(e)=>setAmmount(e.target.value)}
                            size="lg"
                            placeholder="Enter amount"
                            
                        />
                    </div>
                    <div className="w-4/5 md:flex-1">
                        <label 
                            htmlFor="" 
                            className="font-bold text-sm mb-3 block"
                        >
                            From
                        </label>
                        <Listbox value={selectedFrom} onChange={setSelectedFrom}>
      {({ open }) => (
        <>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm min-h-50">
              <span className="flex items-center">
                <img src={selectedFrom.avatar} alt="" className="h-6 w-6 flex-shrink-0 rounded-full" />
                <span className="ml-3 block truncate">{selectedFrom.name}</span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {currencies.map((person) => (
                  <Listbox.Option
                    key={person.id}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-indigo-600' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-9'
                      )
                    }
                    value={person}
                  >
                    {({ selectedFrom, active }) => (
                      <>
                        <div className="flex items-center">
                          <img src={person.avatar} alt="" className="h-6 w-6 flex-shrink-0 rounded-full" />
                          <span
                            className={classNames(selectedFrom ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                          >
                            {person.name}
                          </span>
                        </div>

                        {selectedFrom ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
                    </div>
                    <div className="border-2 border-blue-100 rounded-full p-4 flex justify-center cursor-pointer hover:border-indigo-900" onClick={swapCurrency}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 17 17"
                                aria-hidden="true"
                                className="w-4 h-4 text-indigo-900 miscellany___StyledIconSwap-sc-1r08bla-1 fZJuOo"
                            >
                            <path
                            fill="currentColor"
                            fillRule="evenodd"
                            d="M11.726 1.273l2.387 2.394H.667V5h13.446l-2.386 2.393.94.94 4-4-4-4-.94.94zM.666 12.333l4 4 .94-.94L3.22 13h13.447v-1.333H3.22l2.386-2.394-.94-.94-4 4z"
                            clipRule="evenodd"
                            ></path>
                        </svg>
                    </div>
                    <div className="w-4/5 md:flex-1">
                        <label 
                            htmlFor="" 
                            className="font-bold text-sm mb-3 block"
                        >
                            To
                        </label>
                        <Listbox value={selectedTo} onChange={setSelectedTo}>
                            {({ open }) => (
                                <>
                                <div className="relative mt-1">
                                    <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm min-h-50">
                                    <span className="flex items-center">
                                        <img src={selectedTo.avatar} alt="" className="h-6 w-6 flex-shrink-0 rounded-full" />
                                        <span className="ml-3 block truncate">{selectedTo.name}</span>
                                    </span>
                                    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                        <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </span>
                                    </Listbox.Button>

                                    <Transition
                                    show={open}
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                    >
                                    <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                        {currencies.map((person) => (
                                        <Listbox.Option
                                            key={person.id}
                                            className={({ active }) =>
                                            classNames(
                                                active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                                'relative cursor-default select-none py-2 pl-3 pr-9'
                                            )
                                            }
                                            value={person}
                                        >
                                            {({ selectedTo, active }) => (
                                            <>
                                                <div className="flex items-center">
                                                <img src={person.avatar} alt="" className="h-6 w-6 flex-shrink-0 rounded-full" />
                                                <span
                                                    className={classNames(selectedTo ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                                >
                                                    {person.name}
                                                </span>
                                                </div>

                                                {selectedTo ? (
                                                <span
                                                    className={classNames(
                                                    active ? 'text-white' : 'text-indigo-600',
                                                    'absolute inset-y-0 right-0 flex items-center pr-4'
                                                    )}
                                                >
                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                                ) : null}
                                            </>
                                            )}
                                        </Listbox.Option>
                                        ))}
                                    </Listbox.Options>
                                    </Transition>
                                </div>
                                </>
                            )}
                        </Listbox>
                    </div>
            </div>

            <div className="flex flex-col justify-between mt-10  items-center md:flex-row">
                <div>
                    <div>
                      <p className="flex items-center text-xs font-regular text-gray-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        &nbsp; This conversion uses midmarket rates.
                      </p>
                    </div>
                     <>
                       <div>
                         <div className="flex gap-1 mb-1">
                           <p className="font-semibold text-sm text-gray-500">
                           </p>
                         </div>
                         <div className="flex gap-1 font-normal items-baseline">
                           <p className="text-5xl font-bold">
                            
                           </p>
                         </div>
                       </div>
                     </>
                </div>
                <div className='w-full  flex justify-between gap-5 p-2 flex-col items-center md:w-3/5 md:items-end'>
                  <button className={
                      !amount
                        ? 'cursor-not-allowed inline-flex justify-center py-3 px-5 border border-transparent shadow-sm text-md font-bold rounded-md text-white bg-gray-300'
                        : 'inline-flex justify-center py-2 px-5 border border-transparent shadow-sm text-md font-bold rounded-md text-white bg-indigo-900 hover:bg-indigo-600'
                    }>
                    Convert
                  </button>
                  <div className='bg-white shadow-md w-4/5 h-20 m-auto left-5 rounded-md flex justify-center text-xl items-center'>
                   { val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}  {selectedTo.name}
                  </div>
                </div>
              </div>


        </form>
    </div>
  )
}

export default Home