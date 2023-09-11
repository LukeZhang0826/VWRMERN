import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../../components/formContainer/FormContainer';
import { toast } from 'react-toastify'
import Loader from '../../components/loader/Loader';
import { setCredentials } from '../../slices/authSlice'
import { useUpdateUserMutation, useGetUserProfileQuery } from '../../slices/usersApiSlice'

const ProfilePage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState(''); 
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { data: userProfile, isLoading: isUserProfileLoading, isError } = useGetUserProfileQuery();

    useEffect(() => {
        if (userProfile) {
            setPhone(userProfile.phone);
            setName(userProfile.name);
            setEmail(userProfile.email);
        }
    }, [userProfile]);

    const [updateProfile, {isLoading: isUpdateProfileLoading}] = useUpdateUserMutation();

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
        } else {
            try {
                const res = await updateProfile({
                    _id: userProfile._id,
                    name,
                    email,
                    phone,
                    password
                }).unwrap();
                dispatch(setCredentials({...res}));
                toast.success('Profile Updated!')
            } catch (err) {
                toast.error(err?.data?.message || err.error)
            }
        }
    }

    return (
        <FormContainer>
            <h1>Update Profile</h1>

            <Form onSubmit={ submitHandler }>
                <Form.Group className='my-2' controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='name' placeholder='Enter Name' value={name} onChange={ (e) => setName(e.target.value) }/>
                </Form.Group>

                <Form.Group className='my-2' controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' placeholder='Enter Email' value={email} onChange={ (e) => setEmail(e.target.value.toLowerCase()) }/>
                </Form.Group>

                <Form.Group className='my-2' controlId='phone'>
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type='phone' placeholder='Enter Phone Number' value={phone} onChange={ (e) => setPhone(e.target.value) }/>
                </Form.Group>

                <Form.Group className='my-2' controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter Password' value={password} onChange={ (e) => setPassword(e.target.value) }/>
                </Form.Group>

                <Form.Group className='my-2' controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type='password' placeholder='Confirm Password' value={confirmPassword} onChange={ (e) => setConfirmPassword(e.target.value) }/>
                </Form.Group>

                {(isUpdateProfileLoading || isUserProfileLoading) && <Loader/>}
                <Button type='submit' variant='primary' className='mt-3' disabled={isUpdateProfileLoading || isUserProfileLoading}>
                    Update
                </Button>
            </Form>
        </FormContainer>
    )
}

export default ProfilePage
