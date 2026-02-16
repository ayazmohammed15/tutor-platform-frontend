import Card from './Card';

const RolePlaceholder = ({ title, description }) => {
  return (
    <Card>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
      <p className="text-gray-600">{description}</p>
    </Card>
  );
};

export default RolePlaceholder;
