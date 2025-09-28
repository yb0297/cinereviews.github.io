import { Review } from '../types/review';

// Sample reviews to demonstrate multi-user functionality
export const setupSampleReviews = () => {
  const sampleReviews: Review[] = [
    {
      id: 'sample_1',
      user_id: 'user_demo_1',
      movie_id: 157336, // Popular movie ID that's likely to be viewed
      movie_title: 'Interstellar',
      rating: 9,
      title: 'Mind-blowing sci-fi masterpiece!',
      content: 'Christopher Nolan has outdone himself with this incredible journey through space and time. The emotional depth combined with stunning visuals makes this a must-watch.',
      pros: ['Amazing visual effects', 'Emotional storyline', 'Outstanding soundtrack by Hans Zimmer'],
      cons: ['Complex plot might confuse some viewers', 'Long runtime'],
      recommendation: 'highly_recommend',
      created_at: '2025-09-27T10:30:00.000Z',
      updated_at: '2025-09-27T10:30:00.000Z',
      user_name: 'Sarah Johnson',
      user_avatar: undefined
    },
    {
      id: 'sample_2',
      user_id: 'user_demo_2',
      movie_id: 157336, // Same movie
      movie_title: 'Interstellar',
      rating: 8,
      title: 'Great movie but could be shorter',
      content: 'While I appreciated the scientific accuracy and emotional core, I felt the movie dragged in certain parts. Still, definitely worth watching for the experience.',
      pros: ['Scientific accuracy', 'Great acting by McConaughey', 'Beautiful cinematography'],
      cons: ['Too long', 'Some scenes feel unnecessary'],
      recommendation: 'recommend',
      created_at: '2025-09-26T15:45:00.000Z',
      updated_at: '2025-09-26T15:45:00.000Z',
      user_name: 'Mike Chen',
      user_avatar: undefined
    },
    {
      id: 'sample_3',
      user_id: 'user_demo_3', 
      movie_id: 550, // Fight Club
      movie_title: 'Fight Club',
      rating: 10,
      title: 'A perfect psychological thriller',
      content: 'This movie completely changed my perspective on modern society. The twist ending is legendary and the performances are flawless.',
      pros: ['Incredible plot twist', 'Outstanding performances', 'Deep social commentary'],
      cons: ['Dark themes might not be for everyone'],
      recommendation: 'highly_recommend',
      created_at: '2025-09-25T20:15:00.000Z',
      updated_at: '2025-09-25T20:15:00.000Z',
      user_name: 'Alex Rodriguez',
      user_avatar: undefined
    }
  ];

  // Add these reviews to localStorage for demonstration
  sampleReviews.forEach(review => {
    const storageKey = `reviews_movie_${review.movie_id}`;
    const existingReviews = localStorage.getItem(storageKey);
    const reviews = existingReviews ? JSON.parse(existingReviews) : [];
    
    // Only add if not already present
    if (!reviews.find((r: Review) => r.id === review.id)) {
      reviews.push(review);
      localStorage.setItem(storageKey, JSON.stringify(reviews));
    }
  });

  console.log('Sample reviews added to localStorage for demonstration');
};

// Auto-setup on import (for development)
if (typeof window !== 'undefined' && localStorage) {
  setupSampleReviews();
}