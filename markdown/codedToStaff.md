// codigo para crear staff y admins
// try {
//   console.log('datos', datos)
//   const { user, session, error } = await supabase.auth.signUp({
//     email: datos.Email,
//     password: datos.Password,
//   })
//   if (error) throw Error(error.message)
//   console.log('session', session)
//   console.log('user', user)
//   if (user) {
//     const { data, error: e} = await supabase
//       .from("profiles")
//       .insert([{
//         username: datos.Username,
//         role: datos.role,
//         userId: user.id
//       }])
//       if(e) throw Error(e.message)
//       console.log('data', data)
//   }
// } catch(error) {
//   console.log('error', error)
// }
