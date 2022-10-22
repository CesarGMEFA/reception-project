import { v4 } from "uuid";

import InputTag from "../molecules/InputTag";
import RowModelsColors from "../molecules/RowModelsColors";

export default function TableResources({ 
  title,
  filteredPhones,
  deleteTag,
  handleSubmit,
  onSubmitItem,
  register,
  registerField
  }) {
  return (
		<section className='w-full mb-5 max-w-[330px]'>
			<div
				className='flex justify-center items-center 
                  text-xs text-gray-700 uppercase bg-gray-200
                  py-3 px-6'
			>
				<span>{title}</span>
			</div>
			<section className='border-x'>
				{filteredPhones().map((item) => (
					<RowModelsColors
						key={v4()}
						features={item}
						deleteTag={deleteTag}
					/>
				))}
				<div className='bg-white border-b py-2 px-6'>
					<form
						onSubmit={handleSubmit(onSubmitItem)}
						className='flex items-center justify-center'
					>
						<InputTag register={register(registerField)} />
					</form>
				</div>
			</section>
		</section>
  );
}