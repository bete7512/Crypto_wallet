import client from '../configuration/apollo.config'
const CODE_BY_EMAIL = `
query MyQuery($email: String = "", $limit: Int = 1) {
    forget_password(where: {email: {_eq: $email}}, limit: $limit) {
      code
      created_at
      email
      expire
      id
    }
  }
  
`
const Code = async (variables) => {
  try {
    const data = await client.request(CODE_BY_EMAIL, variables)
    console.log("forgot Code",data);
    return data['forget_password'][0]
  } catch (error) {
    console.log("forgot Code",error)
    return error
  }

}


const DELETE_CODE = `
mutation MyMutation($id: Int!) {
    delete_forget_password_by_pk(id: $id) {
      id
    }
  }  
`

const DeleteCode = async (variables) => {   
    try {
        const data = await client.request(DELETE_CODE, variables) 
        console.log("forgot DeleteCode",data);        
        return data['delete_forget_password_by_pk']        
    } catch (error) {   
        console.log("forgot DeleteCode",error)    
        return error   
    }
}

const INSERT_CODE = `
mutation MyMutation($code: String = "", $email: String = "", $expire: timestamp = "") {
    insert_forget_password_one(object: {code: $code, email: $email, expire: $expire}) {
      id
      code
    }
  }
`

const InsertCode = async (variables) => {           
    try {
        const data = await client.request(INSERT_CODE, variables)
        console.log("forgot InsertCode",data );        
        return data['insert_forget_password_one']         
    } catch (error) {   
        console.log("forgot InsertCode",error)      
        return error       
    }

}

const DELETE_CODE_BY_EMAIL = `
mutation MyMutation($email: String = "") {
    delete_forget_password(where: {email: {_eq: $email}}) {
      affected_rows
    }
  }
 `
 
    const DeleteCodeByEmail = async (variables) => {     
        try {
            let data = await client.request(DELETE_CODE_BY_EMAIL, variables)        
            console.log("forgot DeleteCodeByEmail",data);     
            return data['delete_forget_password']         
        } catch (error) {      
            console.log("forgot DeleteCodeByEmail",error)       
            return error       
        } 
    }

  
export { Code,DeleteCode,InsertCode,DeleteCodeByEmail }
