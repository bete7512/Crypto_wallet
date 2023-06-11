import client from '../configuration/apollo.config'
const CODE_BY_EMAIL = `
query MyQuery($email: String = "") {
    two_steps(where: {email: {_eq: $email}}) {
      code
      created_at
      email
      expire
      id
      token
    }
  }
`
const Code = async (variables) => {
  try {
    const data = await client.request(CODE_BY_EMAIL, variables)
    console.log("Code",data);
    return data['two_steps'][0]
  } catch (error) {
    console.log("Code",error)
    return error
  }

}


const DELETE_CODE = `
mutation MyMutation($id: Int!) {
    delete_two_steps_by_pk(id: $id) {
      id
    }
  }
`

const DeleteCode = async (variables) => {   
    try {
        const data = await client.request(DELETE_CODE, variables) 
        console.log("DeleteCode",data);        
        return data['delete_two_steps_by_pk']        
    } catch (error) {   
        console.log("DeleteCode",error)    
        return error   
    }
}

const INSERT_CODE = `
mutation MyMutation($code: String = "", $email: String = "", $expire: timestamp = "", $token: String = "") {
    insert_two_steps_one(object: {code: $code, email: $email, expire: $expire, token: $token}) {
      id
    }
  }
`

const InsertCode = async (variables) => {           
    try {
        const data = await client.request(INSERT_CODE, variables)
        console.log("InsertCode",data );        
        return data['insert_two_steps_one']         
    } catch (error) {   
        console.log("InsertCode",error)      
        return error       
    }

}

const DELETE_CODE_BY_EMAIL = `
mutation MyMutation($email: String = "") {
    delete_two_steps(where: {email: {_eq: $email}}) {
      affected_rows
    }
  }
 `
 
    const DeleteCodeByEmail = async (variables) => {     
        try {
            let data = await client.request(DELETE_CODE_BY_EMAIL, variables)        
            console.log("DeleteCodeByEmail",data);     
            return data['delete_two_steps']         
        } catch (error) {      
            console.log("DeleteCodeByEmail",error)       
            return error       
        } 
    }

  
export { Code,DeleteCode,InsertCode,DeleteCodeByEmail }
