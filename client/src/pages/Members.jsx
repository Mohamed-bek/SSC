import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {FaUsers , FaSearch, FaStar} from "react-icons/fa"
import Stars from '../components/Stars';

const Members = () => {
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - replace with actual API call
  const mockMembers = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      image: '/api/placeholder/200/200',
      department: 'Web Development'
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      image: '/api/placeholder/200/200',
      department: 'Data Science'
    },
    {
      id: 3,
      firstName: 'Mike',
      lastName: 'Johnson',
      image: '/api/placeholder/200/200',
      department: 'Mobile Development'
    },
    {
      id: 4,
      firstName: 'Emily',
      lastName: 'Brown',
      image: '/api/placeholder/200/200',
      department: 'UI/UX Design'
    },
    {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        image: '/api/placeholder/200/200',
        department: 'Web Development'
      },
      {
        id: 2,
        firstName: 'Jane',
        lastName: 'Smith',
        image: '/api/placeholder/200/200',
        department: 'Data Science'
      },
      {
        id: 3,
        firstName: 'Mike',
        lastName: 'Johnson',
        image: '/api/placeholder/200/200',
        department: 'Mobile Development'
      },
      {
        id: 4,
        firstName: 'Emily',
        lastName: 'Brown',
        image: '/api/placeholder/200/200',
        department: 'UI/UX Design'
      }
  ];


  useEffect(() => {
    // Simulate API call
    const fetchMembers = async () => {
      try {
        const {data} = await axios.get(process.env.REACT_APP_API_URL + 'member/all' , {
            params: {
                page : 1,
                limit : 12,
                firstName : searchTerm.split(' ')[0],
                lastName : searchTerm.split(' ')[1],

            }
        } );
        setMembers(data.members);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch members', error);
        setIsLoading(false);
      }
    };

    fetchMembers();
  }, [searchTerm]);


  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-dvh bg-gradient-to-br from-gray-900 to-purple-900">
        <div className="animate-pulse text-white text-2xl flex items-center">
          <FaUsers className="mr-4 h-12 w-12" />
          Loading Members...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-gradient-to-b relative from-black via-black/90 via-[70%] to-purple-900/40 to-[100%] py-12 px-4 sm:px-6 lg:px-8 ">
    <Stars/>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-7">
          <h1 className="text-[3rem] font-extrabold text-white mb-0">
            Our Amazing Team
          </h1>
          <p className="text-xl text-gray-300">
            Meet the talented individuals driving innovation
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-5 max-w-md mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search members by name or department"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Members Grid */}
        {members.length === 0 ? (
          <div className="text-center text-white/70 text-xl py-12">
            No members found
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {members.map((member) => (
              <div 
                key={member.id} 
                className="bg-white/10 border max-h-[330px] border-white/20 rounded-2xl overflow-hidden shadow-xl transform transition duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div className="relative">
                  {/* Member Image */}
                  <div className="h-[235px] overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={`${member.firstName} ${member.lastName}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Member Details */}
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {member.firstName} {member.lastName}
                    </h3>
                    <p className="text-primary  font-bold text-[1.05rem]">
                      {member.department?.name || "No Department"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Members;