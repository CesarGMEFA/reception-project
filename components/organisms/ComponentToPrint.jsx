import React from "react";
import { v4 } from "uuid";

export class ComponentToPrint extends React.Component {
  
	render(){

		return (
			<section>
				<section className='bg-white rounded-lg p-6 font-medium w-full min-h-min relative'>
					<section className='flex justify-between tablet:max-w-[1000px]'>
						<p>ID: {this.props.data.id}</p>
						<p>Created: {this.props.created}</p>
					</section>
					<section className='flex justify-between flex-wrap'>
						<div className='mt-4'>
							<p>Name: {this.props.data.name}</p>
							<p>Identity: {this.props.data.identity}</p>
							<p>Date of birth: {this.props.data.date_birth}</p>
							<p>Phone number: {this.props.data.phone_number}</p>
							<p>Email: {this.props.data.email}</p>
						</div>
						<div className='mt-4 mobile:ml-8'>
							<p>Brand: {this.props.data.brand}</p>
							<p>Model: {this.props.data.model}</p>
							<p>Color: {this.props.data.color}</p>
							<p>Received: {this.props.data.received}</p>
							<p>Technical: {this.props.data.technical}</p>
						</div>
					</section>
					<section>
						<p className='my-2'>Delivered with: {this.props.pieces} </p>
						<p>Description:</p>
						<p className='border-2 border-black rounded-lg min-h-[150px] p-2'>
							{this.props.data.description}
						</p>
					</section>
					<section className='mt-2'>
						<p>Service:</p>
						{this.props.services.map((s) => (
							<p key={v4()}>
								{s.service} {s.price}$
							</p>
						))}
						<p className='text-xl mt-2'>Total: {this.props.total}$</p>
					</section>
					<p className="text-xs absolute right-5 bottom-3">firm:___________________________</p>
				</section>
			</section>
		);
	}
}