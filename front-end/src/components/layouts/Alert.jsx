import React, { useContext } from 'react';
import alertContext from '../../context/alert/alertContext';

const Alert = () => {
    const { alerts } = useContext(alertContext);

    return (
        <>
            {alerts.length > 0 && alerts.map(alert => (
                <div key={alert.id} className={`my-2 alert alert-${alert.type}`}>
                    <i className="fa fa-info-circle"></i> {alert.msg}
                </div>
            ))}
        </>
    );
}

export default Alert;