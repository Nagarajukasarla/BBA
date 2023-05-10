import { IconContext } from 'react-icons';
import * as AllIcons from 'react-icons/all';

const IconList = () => {
  const iconNames = Object.keys(AllIcons);

  return (
    <IconContext.Provider value={{ color: 'blue', size: '3em' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {iconNames.map((iconName) => {
          const Icon = AllIcons[iconName];
          return (
            <div key={iconName} style={{ margin: '1rem' }}>
              <p>{iconName}</p>
              <Icon />
            </div>
          );
        })}
      </div>
    </IconContext.Provider>
  );
};

export default IconList;
