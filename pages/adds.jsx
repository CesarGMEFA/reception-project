import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";

import { toast, Toaster } from 'react-hot-toast'

import { v4 } from "uuid";

import Layout from "../layout/Layout";

import HeaderAdds from "../components/molecules/HeaderAdds";
import RowModelsColors from "../components/molecules/RowModelsColors";
import InputTag from "../components/molecules/InputTag";

import { getMolds } from "../services/getMolds";
import { updateModel } from "../services/updateModel";
import { updateColor } from "../services/updateColor";

import { supabase } from "../utils/supabaseClient";

const Adds = ({ data }) => {
	const [currentModels, setCurrentModels] = useState(0);
	const [phones, setPhones] = useState(data);
	const [render, setRender] = useState(false);
	const {
		register,
		handleSubmit,
		setValue,
		formState: { Error },
	} = useForm();

	const filtered = () => {
		return data.slice(currentModels, currentModels + 1)[0];
	};

	const filteredPhonesBrands = () => {
		return filtered().brand;
	};
	const filteredPhonesModel = () => {
		return filtered().model;
	};
	const filteredPhonesColor = () => {
		return filtered().color;
	};

	useEffect(() => {
		setPhones(filtered());
	}, [filtered]);

	const onPrev = () => {
		if (currentModels > 0) setCurrentModels(currentModels - 1);
	};
	const onNext = () => {
		if (currentModels < data.length - 1)
			setCurrentModels(currentModels + 1);
	};

	const onSubmitModel = async (d) => {
		await updateModel(d, data, phones, setValue, render, setRender)
	};

	const onSubmitColor = async (d) => {
		await updateColor(d, data, phones, setValue, render, setRender)
	};

  const deleteTagModel = async (features) => {
    let sendDelete = []
    data.forEach( obj => {
      if (obj.brand === phones.brand) {
        const idx = obj.model.indexOf(features)
        obj.model.splice(idx, 1)
        sendDelete = [...obj.model]
        setRender(!render)
      }
    })
    try {
      const { data: send, error: e } = await supabase
          .from('molds')
          .update({ model: [...sendDelete]})
          .eq('brand', phones.brand)
      
			if (e) throw e

    } catch (error) {
      console.log(error)
    }
  }

  const deleteTagColor = async (features) => {
    let sendDelete = []
    data.forEach( obj => {
      if (obj.brand === phones.brand) {
        const idx = obj.color.indexOf(features)
        obj.color.splice(idx, 1)
        sendDelete = [...obj.color]
        setRender(!render)
      }
    })
    try {
      const { data: send, error: e } = await supabase
          .from('molds')
          .update({ color: [...sendDelete]})
          .eq('brand', phones.brand)
      
			if (e) throw e

    } catch (error) {
      console.log(error)
    }
  }
  
	useEffect(() => {
		filtered();
	}, [render]);

	return (
		<Layout>
			<section className='bg-white rounded-lg p-6 mt-6 self-start'>
				<section className='flex flex-col items-center'>

          <HeaderAdds onPrev={onPrev} onNext={onNext}>
            {filteredPhonesBrands()}
          </HeaderAdds>

					<div className='w-full text-sm text-left text-gray-500'>
						<div className='flex flex-wrap tablet:w-[700px] tablet:justify-evenly'>
							<section className='w-full mb-5 max-w-[330px]'>
								<div className='flex justify-center items-center 
                  text-xs text-gray-700 uppercase bg-gray-200
                  py-3 px-6'
								>
									<span>Model</span>
								</div>
								<section className='border-x'>
									{filteredPhonesModel().map((model) => (
										<RowModelsColors
											key={v4()}
											features={model}
                      deleteTag={deleteTagModel}
										/>
									))}
									<div className='bg-white border-b py-2 px-6'>
										<form
											onSubmit={handleSubmit(onSubmitModel)}
											className='flex items-center justify-center'
										>
                      <InputTag register={register("newModel")} />
										</form>
									</div>
								</section>
							</section>

							<section className='w-full max-w-[330px]'>
								<div className='flex justify-center items-center 
                  text-xs text-gray-700 uppercase bg-gray-200
                  py-3 px-6'
								>
									<span>Color</span>
								</div>
								<section className='border-x'>
									{filteredPhonesColor().map((color) => (
										<RowModelsColors
											key={v4()}
											features={color}
											deleteTag={deleteTagColor}
										/>
									))}
									<div className='bg-white border-b py-2 px-6'>
										<form
											onSubmit={handleSubmit(onSubmitColor)}
											className='flex items-center justify-center'
										>
                      <InputTag register={register("newColor")} />
										</form>
									</div>
								</section>
							</section>
						</div>
					</div>
				</section>

        <Toaster />
			</section>
		</Layout>
	);
};

export default Adds

export async function getServerSideProps() {
	const data = await getMolds();

	return {
		props: {
			data,
		},
	};
}

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
