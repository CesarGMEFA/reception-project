import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";

import { Toaster } from 'react-hot-toast'

import Layout from "../layout/Layout";

import HeaderAdds from "../components/molecules/HeaderAdds";

import TableResources from "../components/organisms/TableResources";
import AddStaff from "../components/organisms/AddStaff";

import { getMolds } from "../services/getMolds";
import { updateModel } from "../services/updateModel";
import { updateColor } from "../services/updateColor";

import { supabase } from "../utils/supabaseClient";

const Adds = ({ data, users }) => {
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
      console.error(error)
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
      console.error(error)
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

					<div className='w-min text-sm text-left text-gray-500'>
						<div className='flex flex-wrap tablet:w-[700px] tablet:justify-evenly'>

							<TableResources title={"Model"} filteredPhones={filteredPhonesModel}
								deleteTag={deleteTagModel}
								handleSubmit={handleSubmit}
								onSubmitItem={onSubmitModel}
								register={register}
								registerField={"newModel"}
							/>
							<TableResources title={"Color"} filteredPhones={filteredPhonesColor}
								deleteTag={deleteTagColor}
								handleSubmit={handleSubmit}
								onSubmitItem={onSubmitColor}
								register={register}
								registerField={"newColor"}
							/>


						</div>
					</div>
				</section>

				<AddStaff users={users} />

			</section>
      <Toaster />
		</Layout>
	);
};

export default Adds

export async function getServerSideProps() {
	const data = await getMolds();

	let { data: users, error } = await supabase
    .from('profiles')
    .select('*')
  if (error) throw error

	return {
		props: {
			data,
			users
		},
	};
}