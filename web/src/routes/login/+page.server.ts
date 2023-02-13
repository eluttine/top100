import { generateUsername } from "$lib/utils"
import { error, redirect, type RequestEvent } from "@sveltejs/kit"
import { formBody } from "$lib/form-helpers";
import type { UsersRecord } from "$lib/pocketbase-types";
import { RecordAuthResponse } from "pocketbase";

export const actions = {
  login: async (event: RequestEvent) => {
    const {locals, request} = event

    const formData = await request.formData()
    const values = formBody(formData)

    const email = values['email'].toString()
    const password = values['password'].toString()
    
    try {
      const {token, record } = await locals.pb.collection('users').authWithPassword<UsersRecord>(email, password)
      
      if(!locals.pb.authStore.model.) {

        return {
          notVerified: true
        }
      }
    } catch (err) {
      console.log('Error: ', err)
      throw error(500, 'Something went wrong when logging in')
    }

    throw redirect(303, '/')
  }
}