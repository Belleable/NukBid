import { icon } from '@fortawesome/fontawesome-svg-core';
import { Toaster } from 'react-hot-toast';

function Alert () {

  return (
      <div>
            <Toaster
                  toastOptions={{
                        style: {
                              // color: 'white',
                              fontWeight: '400',
                              fontSize: 'min(1em, 20px)',
                              marginTop: '50px'
                        },
                        
                        success: {
                              icon: '✅',
                              style: {
                                    background: '#E8F8F5',
                                    border: '2px solid #48C9B0',
                                    color: '#48C9B0'
                              }
                        },
                        error: {
                              icon: '❗️',
                              style: {
                                    background: '#FDEDEC',
                                    border: '2px solid #F1948A',
                                    color: '#F1948A'
                              }
                        }
                  }}
            />
    </div>
  );
};
export default Alert;