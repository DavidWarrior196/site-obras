export const prerender = false;
import type { APIRoute } from "astro";

export const POST : APIRoute = async ({ request }) => {
    const data = await request.formData();
    const first_name = data.get('first_name');
    const last_name = data.get('last_name');
    const email = data.get('email');
    const phone = data.get('phone');
    const postal_code = data.get('postal_code');
    const intervention = data.get('intervention');
    const message = data.get('message');

    if(!first_name || !last_name || !email || !phone || !postal_code) {
        return new Response(
            JSON.stringify({ 
                message: 'Por favor, preencha todos os campos obrigatórios' 
            }),
            { status: 400 }
        )
    }

    // Proccess the data here

    return new Response(
        JSON.stringify({
            message: 'Sua solicitação foi enviada com sucesso!'
        }),
        { status: 200}
    )
}