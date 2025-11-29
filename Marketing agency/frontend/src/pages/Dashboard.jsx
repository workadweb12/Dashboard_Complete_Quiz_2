import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function Dashboard() {
	const { user } = useAuth();
	const navigate = useNavigate();
	const [showUpdateModal, setShowUpdateModal] = useState(false);
	const [updateData, setUpdateData] = useState({
		fullname: user?.fullname || '',
		username: user?.username || '',
		email: user?.email || ''
	});
	const [updateErrors, setUpdateErrors] = useState({});
	const [updateMessage, setUpdateMessage] = useState('');
	const [isUpdating, setIsUpdating] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);

	const handleLogout = async () => {
		try {
			await axios.post('http://localhost:3001/logout', {}, { withCredentials: true });
			navigate('/login', { replace: true });
		} catch (e) {}
	};

	const handleUpdateChange = (e) => {
		const { name, value } = e.target;
		setUpdateData(prev => ({
			...prev,
			[name]: value
		}));
		if (updateErrors[name]) {
			setUpdateErrors(prev => ({
				...prev,
				[name]: ''
			}));
		}
		setUpdateMessage('');
	};

	const handleUpdateData = async (e) => {
		e.preventDefault();
		setUpdateErrors({});
		setUpdateMessage('');
		setIsUpdating(true);

		try {
			const res = await axios.put(
				'http://localhost:3001/user/update',
				updateData,
				{ withCredentials: true }
			);

			if (res.data.success) {
				setUpdateMessage('Data updated successfully!');
				setTimeout(() => {
					setShowUpdateModal(false);
					window.location.reload(); // Reload to get updated user data
				}, 1500);
			} else {
				if (res.data.errors) {
					setUpdateErrors(res.data.errors);
				} else if (res.data.field) {
					setUpdateErrors({ [res.data.field]: res.data.msg });
				} else {
					setUpdateMessage(res.data.msg || 'Failed to update data');
				}
			}
		} catch (err) {
			console.error('Update error:', err);
			const errorMsg = err.response?.data?.msg || err.message || 'Failed to update data';
			if (err.response?.data?.errors) {
				setUpdateErrors(err.response.data.errors);
			} else if (err.response?.data?.field) {
				setUpdateErrors({ [err.response.data.field]: errorMsg });
			} else {
				setUpdateMessage(errorMsg);
			}
		} finally {
			setIsUpdating(false);
		}
	};

	const handleDeleteAccount = async () => {
		if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
			return;
		}

		setIsDeleting(true);

		try {
			const res = await axios.delete(
				'http://localhost:3001/user/delete',
				{ withCredentials: true }
			);

			if (res.data.success) {
				alert('Account deleted successfully');
				navigate('/login', { replace: true });
			} else {
				alert(res.data.msg || 'Failed to delete account');
			}
		} catch (err) {
			console.error('Delete error:', err);
			alert(err.response?.data?.msg || err.message || 'Failed to delete account');
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<div className="container mt-5">
			<div className="d-flex justify-content-between align-items-center mb-4">
				<div>
					<h1 className="mb-2">Dashboard</h1>
					<p className="lead mb-0">Welcome, {user?.fullname || user?.username}</p>
				</div>
				<div className="d-flex gap-2">
					<button 
						className="btn btn-primary" 
						onClick={() => {
							setUpdateData({
								fullname: user?.fullname || '',
								username: user?.username || '',
								email: user?.email || ''
							});
							setUpdateErrors({});
							setUpdateMessage('');
							setShowUpdateModal(true);
						}}
					>
						Update Data
					</button>
					<button 
						className="btn btn-danger" 
						onClick={handleDeleteAccount}
						disabled={isDeleting}
					>
						{isDeleting ? 'Deleting...' : 'Delete Account'}
					</button>
					<button className="btn btn-outline-secondary" onClick={handleLogout}>
						Logout
					</button>
				</div>
			</div>

			{/* Update Modal */}
			{showUpdateModal && (
				<div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
					<div className="modal-dialog modal-dialog-centered">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title">Update Your Data</h5>
								<button 
									type="button" 
									className="btn-close" 
									onClick={() => {
										setShowUpdateModal(false);
										setUpdateErrors({});
										setUpdateMessage('');
									}}
								></button>
							</div>
							<form onSubmit={handleUpdateData}>
								<div className="modal-body">
									{updateMessage && (
										<div className={`alert ${updateMessage.includes('success') ? 'alert-success' : 'alert-danger'}`}>
											{updateMessage}
										</div>
									)}

									<div className="mb-3">
										<label htmlFor="fullname" className="form-label">Full Name</label>
										<input
											type="text"
											className={`form-control ${updateErrors.fullname ? 'is-invalid' : ''}`}
											id="fullname"
											name="fullname"
											value={updateData.fullname}
											onChange={handleUpdateChange}
											required
										/>
										{updateErrors.fullname && (
											<div className="invalid-feedback">{updateErrors.fullname}</div>
										)}
									</div>

									<div className="mb-3">
										<label htmlFor="username" className="form-label">Username</label>
										<input
											type="text"
											className={`form-control ${updateErrors.username ? 'is-invalid' : ''}`}
											id="username"
											name="username"
											value={updateData.username}
											onChange={handleUpdateChange}
											required
										/>
										{updateErrors.username && (
											<div className="invalid-feedback">{updateErrors.username}</div>
										)}
									</div>

									<div className="mb-3">
										<label htmlFor="email" className="form-label">Email</label>
										<input
											type="email"
											className={`form-control ${updateErrors.email ? 'is-invalid' : ''}`}
											id="email"
											name="email"
											value={updateData.email}
											onChange={handleUpdateChange}
											required
										/>
										{updateErrors.email && (
											<div className="invalid-feedback">{updateErrors.email}</div>
										)}
									</div>
								</div>
								<div className="modal-footer">
									<button 
										type="button" 
										className="btn btn-secondary" 
										onClick={() => {
											setShowUpdateModal(false);
											setUpdateErrors({});
											setUpdateMessage('');
										}}
									>
										Cancel
									</button>
									<button 
										type="submit" 
										className="btn btn-primary"
										disabled={isUpdating}
									>
										{isUpdating ? 'Updating...' : 'Update Data'}
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}


