import React from 'react'
import {
	Formik,
	Form,
	Field,
	ErrorMessage,
	FieldArray,
	FastField,
} from 'formik'
import * as Yup from 'yup'
import './TextError'
import TextError from './TextError'

const initialValues = {
	name: '',
	email: '',
	channel: '',
	address: '',
	//nested objects
	social: {
		facebook: '',
		twitter: '',
	},
	phoneNumbers: ['', ''],
	phNumbers: [''],
}

const onSubmit = (values) => {
	console.log('Form data', values)
}

const validationSchema = Yup.object({
	name: Yup.string().required('Required!'),
	email: Yup.string().email('Invalid email format').required('Required!'),
	channel: Yup.string().required('Required!'),
})

const validateComments = (value) => {
	let error
	if (!value) {
		error = 'Required'
	}
}

function YouTubeForm() {
	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={onSubmit}
			// validateOnChange={false}
			// validateOnBlur={false}
			// validateOnMount
		>
			{(formik) => {
				console.log('formik props', formik)
				return (
					<Form>
						<div className="form-control">
							<label htmlFor="name">Name</label>
							<Field type="text" id="name" name="name" />
							<ErrorMessage name="name" component={TextError} />
						</div>
						<div className="form-control">
							<label htmlFor="email">E-mail</label>
							<Field type="email" id="email" name="email" />
							<ErrorMessage name="email">
								{(errorMsg) => <div className="error">{errorMsg}</div>}
							</ErrorMessage>
						</div>
						<div className="form-control">
							<label htmlFor="channel">Channel</label>
							<Field type="text" id="channel" name="channel" />
							<ErrorMessage name="channel" />
						</div>
						<div className="form-control">
							<label htmlFor="comments">Comments</label>
							<Field
								as="textarea"
								id="comments"
								name="comments"
								validate={validateComments}
							/>
							<ErrorMessage name="comments" component={TextError} />
						</div>

						<div className="form-control">
							<label htmlFor="address">Address</label>
							<FastField name="address">
								{(props) => {
									console.log('field render')
									const { field, form, meta } = props //just letting form const to show dat these are Field root propss
									return (
										<div>
											<input type="text" id="address" {...field} />
											{meta.touched && meta.error ? (
												<div>{meta.error}</div>
											) : null}
										</div>
									)
								}}
							</FastField>
						</div>

						<div className="form-control">
							<label htmlFor="facebook">Facebook profile</label>
							<Field type="text" id="facebook" name="social.facebook" />
						</div>

						<div className="form-control">
							<label htmlFor="twitter">Twitter profile</label>
							<Field type="text" id="twitter" name="social.twitter" />
						</div>

						<div className="form-control">
							<label htmlFor="primaryPh">Primary phone number</label>
							<Field type="text" id="primaryPh" name="phoneNumbers[0]" />
						</div>

						<div className="form-control">
							<label htmlFor="secondaryPh">Secondary phone number</label>
							<Field type="text" id="secondaryPh" name="phoneNumbers[1]" />
						</div>

						<div className="form-control">
							<label>Label of phone numbers</label>
							<FieldArray name="phNumbers">
								{(fieldArrayProps) => {
									// console.log('fieldArrayProps', fieldArrayProps)
									const { push, remove, form } = fieldArrayProps
									const { values } = form
									const { phNumbers } = values
									// console.log('form errors', form.errors)
									return (
										<div>
											{phNumbers.map((_phNumber, index) => (
												<div key={index}>
													<Field name={`phNumbers[${index}]`} />
													{index > 0 && (
														<button type="button" onClick={() => remove(index)}>
															-
														</button>
													)}

													<button type="button" onClick={() => push(index)}>
														+
													</button>
												</div>
											))}
										</div>
									)
								}}
							</FieldArray>
						</div>

						<button
							type="button"
							onClick={() => formik.validateField('comments')}>
							Validate comments
						</button>
						<button type="button" onClick={() => formik.validateForm()}>
							Validate all
						</button>

						<button type="button" onClick={() => formik.setTouched('comments')}>
							Visit comments
						</button>
						<button
							type="button"
							onClick={() =>
								formik.setTouched({
									name: true,
									email: true,
									channel: true,
									comments: true,
								})
							}>
							Visit fiels
						</button>
						<button type="submit" disabled={!formik.isValid}>
							Submit
						</button>
					</Form>
				)
			}}
		</Formik>
	)
}

export default YouTubeForm
