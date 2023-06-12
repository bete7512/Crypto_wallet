import gql from "graphql-tag";

export const LOGIN = gql`
  mutation MyMutation($phone: String!, $password: String!) {
    login(inputs: { phone: $phone, password: $password }) {
      accestoken
      id
    }
  }
`;

export const ADDRESS_INSERT = gql`
  mutation MyMutation(
    $region_id: uuid = ""
    $woreda_id: uuid = ""
    $zone_id: uuid = ""
    $name: String = ""
    $latitude: String = ""
    $longitude: String = ""
    $location_description: String = ""
  ) {
    insert_address(
      objects: {
        region_id: $region_id
        woreda_id: $woreda_id
        zone_id: $zone_id
        kebele: {
          data: {
            name: $name
            latitude: $latitude
            longitude: $longitude
            location_description: $location_description
          }
        }
      }
    ) {
      returning {
        id
      }
    }
  }
`;

export const ALL_ADDRESS_QUERY = gql`
  query MyQuery {
    region {
      name
      id
      zones {
        name
        id
        woredas {
          name
          id
        }
      }
    }
  }
`;

// export const INSERT_ADDRESS = gql`
//   mutation MyMutation(
//     $region_id: uuid = ""
//     $woreda_id: uuid = ""
//     $zone_id: uuid = ""
//   ) {
//     insert_address(
//       objects: {
//         region_id: $region_id
//         woreda_id: $woreda_id
//         zone_id: $zone_id
//       }
//     ) {
//       returning {
//         id
//       }
//     }
//   }
// `;

export const QUERY_PROBLEM_CLASS = gql`
  query MyQuery {
    problem_class {
      name
      description
      id
    }
  }
`;

export const REGIONS = gql`
  query MyQuery {
    region {
      id
      name
    }
  }
`;

export const DELETE_TECHNICIAN_BY_ID = gql`
  mutation MyMutation($id: uuid = "") {
    delete_technician_by_pk(id: $id) {
      address_id
      created_at
      first_name
      is_verified
      id
    }
  }
`;

export const ZONES = gql`
  query MyQuery($region_id: uuid = "") {
    zone(where: { region_id: { _eq: $region_id } }) {
      id
      name
      region_id
    }
  }
`;

export const WOREDAS = gql`
  query MyQuery($zone_id: uuid = "") {
    woreda(where: { zone_id: { _eq: $zone_id } }) {
      id
      name
      zone_id
    }
  }
`;

export const INSERT_SERVICE_REQUEST = gql`
mutation MyMutation($k_name: String = "", $region_id: uuid = "", $woreda_id: uuid = "", $zone_id: uuid = "", $customer_id: String = "", $customer_phone: String = "", $problem_class_id: uuid = "", $problem_description: String = "", $product_id: String = "", $phone_two: String = "", $is_in_warranty_request: Boolean = false, $order_item_id: String = "") {
  insert_service_request_one(object: {address: {data: {kebele: {data: {name: $k_name}}, region_id: $region_id, woreda_id: $woreda_id, zone_id: $zone_id}}, customer_id: $customer_id, customer_phone: $customer_phone, problem_class_id: $problem_class_id, problem_description: $problem_description, product_id: $product_id, selling_phone: $phone_two, is_in_warranty_request: $is_in_warranty_request, order_item_id: $order_item_id}) {
    id
    customer_phone
  }
}

`;

export const INSERT_TECHNICIAN = gql`
  mutation MyMutation(
    $region_id: uuid = ""
    $zone_id: uuid = ""
    $woreda_id: uuid = ""
    $k_name: String = ""
    $longitude: String = ""
    $latitude: String = ""
    $location_description: String = ""
    $first_name: String = ""
    $last_name: String = ""
    $password: String = ""
    $phone_number: String = ""
    $bios: String = ""
  ) {
    insert_technician_one(
      object: {
        address: {
          data: {
            region_id: $region_id
            zone_id: $zone_id
            woreda_id: $woreda_id
            kebele: {
              data: {
                name: $k_name
                longitude: $longitude
                latitude: $latitude
                location_description: $location_description
              }
            }
          }
        }
        first_name: $first_name
        last_name: $last_name
        password: $password
        phone_number: $phone_number
        bios: $bios
      }
    ) {
      id
      first_name
    }
  }
`;

export const QUERY_ALL_SERVICE_REQUEST = gql`
query MyQuery($filter: service_request_bool_exp, $limit: Int = 10, $offset: Int = 0) {
  service_request(where: $filter, offset: $offset, limit: $limit, order_by: {created_at: desc}) {
    created_at
    customer_id
    customer_phone
    id
    is_in_warranty_request
    is_assigned_to_technician
    problem_class_id
    product_id
    order_item_id
    selling_phone
    status
    problem_description
    technician_id
    updated_at
    technician {
      first_name
      last_name
    }
    address {
      kebele {
        name
      }
      region {
        name
      }
      zone {
        name
      }
      woreda {
        name
      }
    }
  }
  service_request_aggregate(where: $filter) {
    aggregate {
      count(distinct: false)
    }
  }
}
`;

export const QUERY_ALL_TECHNICIAN = gql`
  query MyQuery(
    $filter: technician_bool_exp = {}
    $limit: Int = 10
    $offset: Int = 0
  ) {
    technician(where: $filter, offset: $offset, limit: $limit) {
      first_name
      id
      is_verified
      last_name
      avator
      phone_number
      availability
      created_at
      service_requests_aggregate {
        aggregate {
          count(distinct: false)
        }
      }
      address {
        kebele {
          name
        }
        region {
          name
        }
        woreda {
          name
        }
        zone {
          name
        }
      }
    }
    technician_aggregate(where: $filter) {
      aggregate {
        count(distinct: false)
      }
    }
  }
`;

export const QUESRY_SERVICE_REQUEST_DETAIL = gql`
query MyQuery($id: uuid = "") {
  service_request_by_pk(id: $id) {
    address_id
    created_at
    customer_id
    technician_id
    customer_phone
    product_id
    order_item_id
    id
    is_in_warranty_request
    is_assigned_to_technician
    problem_class_id
    problem_class {
      name
      description
    }
    problem_description
    selling_phone
    status
    technician {
      availability
      first_name
      last_name
      phone_number
    }
    jobs {
      id
      technician_id
      technician {
        id
        first_name
        last_name
        phone_number
        address {
          kebele {
            id
            name
          }
          region {
            name
          }
          zone {
            id
            name
          }
          woreda {
            id
            name
          }
        }
      }
      proximity
    }
    address {
      zone {
        name
        id
      }
      woreda {
        id
        name
      }
      region {
        name
        id
      }
      kebele {
        created_at
        id
        latitude
        location_description
        longitude
        name
      }
    }
    customer_complains {
      complain
      created_at
      id
    }
    jobs_aggregate {
      aggregate {
        count(distinct: false)
      }
    }
    technician_reports {
      created_at
      id
      images_url
      problem_diagnosis
      solution_provided
      technician_id
      technician_report_date
      is_service_completed
      technician {
        first_name
        last_name
      }
    }
    feed_back_surveys {
      customer_id
      operator_id
      created_at
      id
      is_service_completed
      service_detail
      service_quality
      suggession
      survey_date
    }
    accessory_requests {
      accessory {
        description
        images
        name
        price
      }
      quantity
      reason
      id
      created_at
      is_verified
    }
    service_payments {
      id
      is_paid
      amount
    }
  }
}

`;

export const QUERY_TECHNICIAN_DETAIL = gql`
query MyQuery($id: uuid = "") {
  technician_by_pk(id: $id) {
    address {
      kebele {
        name
        longitude
        location_description
        latitude
        id
      }
      region {
        name
        id
      }
      zone {
        name
      }
      woreda {
        name
      }
    }
    service_requests {
      address_id
      created_at
      customer_id
      customer_phone
      id
      status
      is_assigned_to_technician
      problem_class_id
    }
    availability
    avator
    bios
    created_at
    service_requests_aggregate {
      aggregate {
        count(distinct: false)
      }
    }
    first_name
    is_verified
    last_name
    phone_number
    id
    packages
    bank_accounts {
      id
      account_number
      bank_id
    }
    
  }
}

`;

export const DELETE_SERVICE_REQUEST = gql`
  mutation MyMutation($id: uuid = "") {
    delete_service_request(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

export const USER_QUERY = gql`
  query MyQuery {
    users {
      first_name
      created_at
      id
      last_name
      password
      phone_number
      updated_at
      username
      user_roles {
        created_at
        role {
          name
        }
      }
      status
    }
  }
`;

export const UPDATE_SERVICE_REQUEST_BY_ID = gql`
  mutation MyMutation(
    $id: uuid!
    $customer_phone: String = ""
    $is_in_warranty_request: Boolean = false
    $problem_description: String = ""
    $product_id: uuid = null
    $selling_phone: String = ""
    $status: service_request_status = "opened"
    $address_id: uuid = null
    $customer_id: uuid = null
  ) {
    update_service_request_by_pk(
      pk_columns: { id: $id }
      _set: {
        customer_phone: $customer_phone
        problem_description: $problem_description
        product_id: $product_id
        selling_phone: $selling_phone
        status: $status
        is_in_warranty_request: $is_in_warranty_request
        address_id: $address_id
        customer_id: $customer_id
      }
    ) {
      customer_id
      customer_phone
      id
      address_id
    }
  }
`;

export const QUERY_ALL_ACCESSORY = gql`
  query MyQuery {
    accessory {
      description
      name
      images
      id
      created_at
      quantity_in_stock
      price
    
  }
}
`;

export const INSERT_ACCESSORY = gql`
mutation MyMutation(
  $name: String = ""
  $images: String = ""
  $description: String = ""
  $quantity_in_stock: Int = 10
  $price: Float = 1.5
) {
  insert_accessory_one(
    object: {
      name: $name
      images: $images
      description: $description
      quantity_in_stock: $quantity_in_stock
      price:$price
    }
  ) {
    id
  }
}
`;
export const FILE_UPLOAD = gql`
  mutation MyMutation(
    $type: String = ""
    $name: String = ""
    $base64str: String = ""
  ) {
    fileupload(base64str: $base64str, name: $name, type: $type) {
      file_path
    }
  }
`;
export const INSERT_PROBLEM_CLASS = gql`
  mutation MyMutation($name: String = "") {
    insert_problem_class(objects: { name: $name }) {
      affected_rows
      returning {
        id
        name
      }
    }
  }
`;
export const INSERT_ACCESSORY_REQUEST = gql`
  mutation MyMutation(
    $is_verified: Boolean = false
    $quantity: Int = 10
    $reason: String = ""
    $service_req_id: uuid = ""
    $technician_id: uuid = null
    $accessory_id: uuid = ""
  ) {
    insert_accessory_request_one(
      object: {
        is_verified: $is_verified
        quantity: $quantity
        reason: $reason
        service_req_id: $service_req_id
        technician_id: $technician_id
        accessory_id: $accessory_id
      }
    ) {
      id
    }
  }
`;

export const INSERT_REPORT = gql`
  mutation MyMutation(
    $images_url: String = ""
    $problem_diagnosis: String = ""
    $service_req_id: uuid = null
    $solution_provided: String = ""
    $technician_id: uuid = null
    $technician_report_date: date = ""
    $is_service_completed: Boolean = false
  ) {
    insert_technician_report_one(
      object: {
        images_url: $images_url
        problem_diagnosis: $problem_diagnosis
        service_req_id: $service_req_id
        solution_provided: $solution_provided
        technician_id: $technician_id
        technician_report_date: $technician_report_date
        is_service_completed: $is_service_completed
      }
    ) {
      id
    }
  }
`;

export const INSERT_FEEDBACK = gql`
  mutation MyMutation(
    $is_service_completed: Boolean = false
    $service_detail: String = ""
    $service_id: uuid = null
    $service_quality: String = ""
    $suggession: String = ""
    $survey_date: date = ""
  ) {
    insert_feed_back_survey_one(
      object: {
        is_service_completed: $is_service_completed
        service_detail: $service_detail
        service_id: $service_id
        service_quality: $service_quality
        suggession: $suggession
        survey_date: $survey_date
      }
    ) {
      id
    }
  }
`;

export const INSERT_COMPLAIN = gql`
  mutation MyMutation($complain: String = "", $service_req_id: uuid = null) {
    insert_customer_complain_one(
      object: { complain: $complain, service_req_id: $service_req_id }
    ) {
      id
    }
  }
`;

export const USER = gql`
  query MyQuery(
    $limit: Int = 10
    $offset: Int = 0
    $filter: users_bool_exp = {}
  ) {
    users(limit: $limit, offset: $offset, where: $filter) {
      first_name
      last_name
      status
      phone_number
      username
      id
      user_roles {
        role {
          name
        }
        id
      }
    }
  }
`;

export const QUERY_SERVICE_REQUEST_BY_ID = gql`
query MyQuery($id: uuid = "") {
  service_request_by_pk(id: $id) {
    address_id
    address {
      id
      region_id
      zone_id
      woreda_id
      kebele_id
      kebele {
        id
        name
        woreda_id
      }
      woreda {
        id
        name
        zone_id
      }
      region {
        id
        name
      }
      zone {
        id
        name
      }
    }
    customer_phone
    customer_id
    is_assigned_to_technician
    is_in_warranty_request
    problem_description
    problem_class_id
    product_id
    problem_class {
      name
      description
      id
    }
    status
    selling_phone
    order_item_id
  }
}
`;

export const UPDATE_JOBS_BY_ID = gql`
  mutation MyMutation(
    $id: uuid = ""
    $technician_id: uuid = null
    $is_assigned_to_technician: Boolean = true
    $status: service_request_status = "progress"
    $technician_assigned_at: date = ""
  ) {
    update_service_request_by_pk(
      pk_columns: { id: $id }
      _set: {
        technician_id: $technician_id
        is_assigned_to_technician: $is_assigned_to_technician
        status: $status
        technician_assigned_at: $technician_assigned_at
      }
    ) {
      customer_id
      address_id
      id
    }
  }
`;

export const UPDATE_ADDRESS_BY_ID = gql`
  mutation MyMutation(
    $id: uuid = ""
    $region_id: uuid = null
    $woreda_id: uuid = null
    $zone_id: uuid = null
    $kebele_id: uuid = null
  ) {
    update_address_by_pk(
      pk_columns: { id: $id }
      _set: {
        region_id: $region_id
        woreda_id: $woreda_id
        zone_id: $zone_id
        kebele_id: $kebele_id
      }
    ) {
      id
    }
  }
`;

export const UPDATE_KEBELE = gql`
  mutation MyMutation(
    $id: uuid = ""
    $name: String = ""
    $woreda_id: uuid = ""
  ) {
    update_kebele_by_pk(
      pk_columns: { id: $id }
      _set: { name: $name, woreda_id: $woreda_id }
    ) {
      id
    }
  }
`;

export const INSERT_KEBELE = gql`
  mutation MyMutation($name: String = "", $woreda_id: uuid = null) {
    insert_kebele_one(object: { name: $name, woreda_id: $woreda_id }) {
      id
    }
  }
`;

export const DELETE_KEBELE = gql`
  mutation MyMutation($id: uuid = "") {
    delete_kebele_by_pk(id: $id) {
      id
    }
  }
`;
export const INSERT_REGION = gql`
  mutation MyMutation($name: String = "") {
    insert_region_one(object: { name: $name }) {
      id
    }
  }
`;

export const INSERT_ADDRESS = gql`
  mutation MyMutation(
    $kebele_id: uuid = ""
    $region_id: uuid = ""
    $woreda_id: uuid = ""
    $zone_id: uuid = ""
  ) {
    insert_address_one(
      object: {
        kebele_id: $kebele_id
        region_id: $region_id
        woreda_id: $woreda_id
        zone_id: $zone_id
      }
    ) {
      id
    }
  }
`;

// export const FIND_ACCESSORY_BY_ID = gql`
//   query MyQuery($acessory_id: uuid = null) {
//     price(
//       where: {
//         accessory_id: { _eq: $acessory_id }
//         next_id: { _is_null: true }
//       }
//     ) {
//       id
//       price
//     }
//   }
// `;

export const DELETE_ACCESSORY_REQUEST = gql`
  mutation MyMutation($id: uuid = "") {
    delete_accessory_request_by_pk(id: $id) {
      id
    }
  }
`;

export const DELETE_REPORT = gql`
  mutation MyMutation($id: uuid = "") {
    delete_technician_report_by_pk(id: $id) {
      id
    }
  }
`;

export const DELETE_FEED_BACK = gql`
  mutation MyMutation($id: uuid = "") {
    delete_feed_back_survey_by_pk(id: $id) {
      id
    }
  }
`;

export const DELETE_COMPLAIN = gql`
  mutation MyMutation($id: uuid = "") {
    delete_customer_complain_by_pk(id: $id) {
      id
    }
  }
`;

export const INSERT_JOBS = gql`
  mutation MyMutation($service_req_id: uuid = "", $technician_id: uuid = "") {
    insert_jobs_one(
      object: { service_req_id: $service_req_id, technician_id: $technician_id }
    ) {
      id
    }
  }
`;

export const QUERY_COMPLAINS = gql`
  query MyQuery(
    $filter: technician_complain_bool_exp = {}
    $created_at: order_by = desc
  ) {
    technician_complain(where: $filter, order_by: { created_at: $created_at }) {
      title
      complain
      created_at
      id
      is_resolved
      response
      updated_at
      technician {
        id
        first_name
        phone_number
        last_name
      }
    }
  }
`;

export const QUERY_SERVICE_PAYMENT = gql`
query MyQuery($offset: Int = 0, $limit: Int = 10, $filter: service_payment_bool_exp = {}) {
  service_payment(limit: $limit, offset: $offset, where: $filter) {
    created_at
    is_paid
    
    paymentMethod {
      name
      id
    }
    reciept_code
    amount
    id
    technician {
      first_name
      last_name
      phone_number
    }
  }
  service_payment_aggregate {
    aggregate {
      count(distinct: false)
    }
  }
}

`;

export const QUERY_SUBSCRIPTIONS = gql`
query MyQuery($limit: Int = 10, $offset: Int = 0, $filter: subscription_bool_exp = {}) {
  subscription(offset: $offset, limit: $limit, where: $filter) {
    amount
    created_at
    receipt_number
    status
    id
    subscription_plan {
      id
      name
    }
    technician {
      first_name
      last_name
      phone_number
    }
  }
  subscription_aggregate {
    aggregate {
      count(distinct: false)
    }
  }
}

`;

export const RESOLVE_COMPLAIN = gql`
  mutation MyMutation(
    $id: uuid = ""
    $response: String = ""
    $is_resolved: Boolean = false
  ) {
    update_technician_complain_by_pk(
      pk_columns: { id: $id }
      _set: { response: $response, is_resolved: $is_resolved }
    ) {
      id
    }
  }
`;

export const DELETE_ACCESSORY = gql`
  mutation MyMutation($id: uuid = "") {
    delete_accessory_by_pk(id: $id) {
      id
    }
  }
`;

export const INSERT_ZONE = gql`
mutation MyMutation($name: String = "", $region_id: uuid = "") {
  insert_zone_one(object: {name: $name, region_id: $region_id}) {
    id
  }
}
`;

export const INSERT_WOREDA = gql`
  mutation MyMutation($name: String = "", $zone_id: uuid = "") {
    insert_woreda_one(object: { name: $name, zone_id: $zone_id }) {
      id
    }
  }
`;

export const REMOVE_TECHNICIANS_FROM_JOBS = gql`
  mutation MyMutation($service_req_id: uuid = "", $technician_id: uuid = "") {
    delete_jobs(
      where: {
        _and: { service_req_id: { _eq: $service_req_id }, technician_id: { _eq: $technician_id } }
      }
    ) {
      returning {
        id
      }
    }
  }
`;


export const UPDATE_TECHNICIAN_BY_ID = gql`
mutation MyMutation($id: uuid = "", $address_id: uuid = "",  $bios: String = "", $first_name: String = "", $is_verified: Boolean = false, $last_name: String = "",  $phone_number: String = "") {
  update_technician_by_pk(pk_columns: {id: $id}, _set: {address_id: $address_id, bios: $bios, first_name: $first_name, is_verified: $is_verified, last_name: $last_name, phone_number: $phone_number}) {
    id
  }
}
`; 

export const GET_TECHNICIAN_BY_ID = gql`
query MyQuery($id: uuid = "") {
  technician_by_pk(id: $id) {
    address_id
    address {
      id
      kebele_id
      region_id
      woreda_id
      zone_id
      kebele {
        name
        woreda_id
        id
      }
    }
    availability
    avator
    bios
    first_name
    id
    is_verified
    last_name
    packages
    phone_number
    password
    packages
  }
}
`

export const DELETE_SERVICE_REQUEST_BY_ID = gql`
mutation MyMutation($id: uuid = "") {
  delete_service_request_by_pk(id: $id) {
    id
  }
}`

export const AVAILABILITY_TECHNICIAN_BY_ID = gql`
mutation MyMutation($id: uuid = "", $availability: Boolean = false) {
  update_technician_by_pk(pk_columns: {id: $id}, _set: {availability: $availability}) {
    id
  }
}
`

export const VERIFY_TECHNICIAN_BY_ID = gql`
mutation MyMutation($is_verified: Boolean = false, $id: uuid = "") {
  update_technician_by_pk(pk_columns: {id: $id}, _set: {is_verified: $is_verified}) {
    id
  }
}
 `

 export const UPDATE_USER_BY_ID = gql`
 mutation MyMutation($id: uuid = "", $status: Boolean = false) {
  update_users_by_pk(pk_columns: {id: $id}, _set: {status: $status}){
    id
  }
} 
` 

export const INSERT_SERVICE_PAYMENT = gql`
mutation MyMutation($service_req_id: uuid = "", $technician_id: uuid = "") {
  insert_service_payment_one(object: {is_paid: false, service_req_id: $service_req_id, technician_id: $technician_id}) {
    id
  }
}
`

export const UPDATE_SERVICE_REQUEST_STATUS_BY_ID = gql`
mutation MyMutation($id: uuid = "", $status: service_request_status = "") {
  update_service_request_by_pk(pk_columns: {id: $id}, _set: {status: $status}) {
    id
  }
}
`

export const UPDATE_PAYMENT= gql`
mutation MyMutation($id: uuid = "", $amount: Float = 1.5, $payment_date: date = "", $reciept_code: String = "", $is_paid: Boolean = false) {
  update_service_payment_by_pk(pk_columns: {id: $id}, _set: {amount: $amount, payment_date: $payment_date, reciept_code: $reciept_code, is_paid: $is_paid}) {
    id
  }
}

`

export const INSERT_SUBSCRIPTION= gql`
mutation MyMutation($amount: Float = 1.5, $receipt_number: String = "", $status: Boolean = false, $subscription_plan_id: uuid = "", $technician_id: uuid = "") {
  insert_subscription_one(object: {amount: $amount, receipt_number: $receipt_number, status: $status, subscription_plan_id: $subscription_plan_id, technician_id: $technician_id}) {
    id
  }
}
`

export const UPDATE_SUBSCRIPTION= gql` 
mutation MyMutation($id: uuid = "", $amount: Float = 1.5, $receipt_number: String = "", $subscription_plan_id: uuid = "", $technician_id: uuid = "", $status: Boolean = false) {
  update_subscription_by_pk(pk_columns: {id: $id}, _set: {amount: $amount, receipt_number: $receipt_number, subscription_plan_id: $subscription_plan_id, technician_id: $technician_id, status: $status}) {
    id
  }
}

`

export  const GET_SUBSCRIPTION_BY_ID = gql`
query MyQuery($id: uuid = "") {
  subscription_by_pk(id: $id) {
    amount
    receipt_number
    status
    subscription_plan_id
    technician_id
    id
    created_at
  }
}
`

export const GET_CUSTOMER_BY_ID = gql`
query MyQuery($user_id: String = "") {
  get_customer_by_id(user_id: $user_id) {
    customer
  }
}
`

export const GET_CUSTOMER_BY_PHONE= gql`
query MyQuery($phone: String = "") {
  get_customer_by_phone(phone: $phone) {
    customer
  }
}
`

export const GET_CUSTOMER_PRODUCTS = gql`
query MyQuery($user_id: String = "") {
  get_customer_product(user_id: $user_id) {
    product
  }
}
` 
