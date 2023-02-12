import { generateUsername } from "$lib/utils"
import { error, redirect, type RequestEvent } from "@sveltejs/kit"
import { formBody } from "$lib/form-helpers";

export const actions = {
  register: async (event: RequestEvent) => {
    const {locals, request} = event

    const formData = await request.formData()
    const values = formBody(formData)

    const username = generateUsername(values['name'].toString())
    const email = values['email'].toString()
    
    try {
      await locals.pb.collection('users').create({ username, ...values})
      await locals.pb.collection('users').requestVerification(email)
    } catch (err) {
      console.log('Error: ', err)
      throw error(500, 'Something went wrong')
    }

    throw redirect(303, '/login')
  }
}