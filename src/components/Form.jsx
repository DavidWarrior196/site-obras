import React, { useEffect, useState } from 'react';
import backgroundImage from '@assets/images/backgrounds/city-view.jpg';
import quoteRequest from '@assets/images/quote-request-vector.png';

export default function Form() {
    
    const [filesSelected, setFilesSelected] = useState([]);
    const [responseMessage, setResponseMessage] = useState('');
    
    const handleFileInputChange = (event) => {
        console.log(event)
        const newFiles = Array.from(event.target.files);
        setFilesSelected((prevFiles) => [...prevFiles, ...newFiles]);
        console.log('test');
    }

    async function submitForm(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const response = await fetch('/api/quote-request', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        if(data.message) {
            setResponseMessage(data.message)
        }
    }
    
    return (
        <div className="relative w-full py-20 after:absolute after:top-0 after:right-0 after:w-full after:h-full after:bg-black after:opacity-40">
            <img 
                src={backgroundImage.src}
                alt='Vista de topo de cidade'
                role='img'
                aria-label='Vista de topo de cidade'
                className='absolute top-0 left-0 w-full h-full object-cover object-center'
            />
            <div className='relative grid grid-cols-[3fr_4fr] grid-rows-1 w-full max-w-screen-lg mx-auto z-10 rounded-lg overflow-hidden'>
                <div className='flexflex-col bg-gray-pale px-10 py-16'>
                    <h4 className='mb-8'>Proposta de Orçamento</h4>
                    <p className='mb-8'>Pronto para tirar as suas dúvidas e começar um novo projeto?</p>
                    <img
                        src={quoteRequest.src}
                        alt="Pedido de Orçamento"
                        role="presentation"
                        className="w-[80%] justify-self-center"
                    />
                </div>
                <div className='bg-white p-10'>
                    <form onSubmit={submitForm} className='space-y-4'>
                        <div className='flex gap-4'>
                            <label htmlFor='first_name' className='flex flex-col grow-1'>
                                <span className='ml-1 mb-1 !font-semibold'>Nome *</span>
                                <input 
                                    type="text"
                                    name="first_name"
                                    id="first_name"
                                    placeholder="Primeiro Nome" 
                                    aria-label='Nome'
                                    required
                                    className='border border-blue-primary p-2 outline-none'
                                />
                            </label>
                            <label htmlFor='last_name' className='flex flex-col grow-1'>
                                <span className='ml-1 mb-1 !font-semibold'>Apelido *</span>
                                <input 
                                    type="text"
                                    name="last_name"
                                    id="last_name"
                                    placeholder="Último Nome" 
                                    aria-label='Apelido'
                                    required
                                    className='border border-blue-primary p-2 outline-none'
                                />
                            </label>
                        </div>
                        <div className='flex gap-4'>
                            <label htmlFor='email' className='flex flex-col grow-1'>
                                <span className='ml-1 mb-1 !font-medium'>Endereço de e-mail *</span>
                                <input 
                                    type="text"
                                    name="email"
                                    id="email"
                                    placeholder="example@gmail.com" 
                                    aria-label='Endereço de e-mail'
                                    required
                                    className='border border-blue-primary p-2 outline-none'
                                />
                            </label>
                        </div>
                        <div className='flex gap-4'>
                            <label htmlFor='phone' className='flex flex-col grow-1'>
                                <span className='ml-1 mb-1 !font-semibold'>Telefone *</span>
                                <input 
                                    type="tel"
                                    name="phone"
                                    id="phone"
                                    pattern='[0-9]{3}\s?[0-9]{3}\s?[0-9]{3}'
                                    placeholder="XXX XXX XXX" 
                                    aria-label='Número de telefone'
                                    required
                                    title='Insira o número de telefone no formato XXX XXX XXX'
                                    className='border border-blue-primary p-2 outline-none'
                                />
                            </label>
                            <label htmlFor='postal_code' className='flex flex-col grow-1'>
                                <span className='ml-1 mb-1 !font-semibold'>Código Postal *</span>
                                <input 
                                    type="text"
                                    name="postal_code"
                                    id="postal_code"
                                    pattern='[0-9]{4}[\-\s]?[0-9]{3}'
                                    placeholder="XXXX-XXX"
                                    title='Insira o código postal no formato XXXX-XXX'
                                    required
                                    className='border border-blue-primary p-2 outline-none'
                                />
                            </label>
                        </div>
                        <div className='flex flex-wrap gap-x-6 gap-y-2'>
                            <span className='w-full ml-1 mb-1 mt-2 !font-semibold'>Área de Intervenção *</span>
                            {["Construção", "Remodelação", "Mobiliário/Montagem", "Pinturas", "Limpezas", "Reparações", "Outro"].map((intervention, index) =>
                                <label key={index} htmlFor={`intervention_${intervention}`} className='flex items-center gap-2'>
                                    <input
                                        type='checkbox'
                                        name='intervention[]'
                                        id={`intervention_${intervention}`}
                                        value={intervention}
                                        aria-label="Tipo de intervenção"
                                        role="checkbox"
                                        className='accent-blue-primary'
                                    />
                                    <span>{intervention}</span>
                                </label>
                            )}
                        </div>
                        <div className='flex flex-col gap-2'>
                            <span className='ml-1 mb-1 !font-semibold'>Anexos</span>
                            <label htmlFor='files' className='flex flex-col space-x-2 w-fit py-2 px-6 cursor-pointer rounded-md bg-blue-primary text-white'>
                                <div className='flex items-center gap-2'>
                                    <i className="fa-regular fa-images" />
                                    <span>Escolher Ficheiros</span>
                                </div>
                                <input 
                                    type="file"
                                    name="files"
                                    id="files"
                                    aria-label='Anexos'
                                    multiple
                                    className='hidden'
                                    onChange={handleFileInputChange}
                                    max={20}
                                />  
                            </label>
                            <ul id="file-list" className='flex flex-wrap gap-2 list-none'>
                                {filesSelected.map((file, index) =>
                                    <li key={index}>{file.name} ({(file.size / 1024).toFixed(2)} KB)</li>
                                )}
                            </ul>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <span className='ml-1 mb-1 !font-semibold'>Comentários ou Observações</span>
                            <textarea 
                                name="message"
                                id="message"
                                placeholder="Descrição resumida sobre a área de intervenção e o serviço pretendido."
                                aria-label='Mensagem'
                                className='border border-blue-primary p-2 outline-none resize'
                                rows={3}
                                maxLength={2000}
                            />
                        </div>
                        
                        <input 
                            type="submit" 
                            value={responseMessage ? responseMessage : "Submeter"} 
                            className={`w-full text-white rounded-md text-center py-2 ${responseMessage ? 'bg-green-600' : 'bg-blue-primary'}`} 
                        />
                        
                    </form>
                </div>
            </div>
        </div>
    );
}
