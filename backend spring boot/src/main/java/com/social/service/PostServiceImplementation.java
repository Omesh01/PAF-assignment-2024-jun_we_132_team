package com.social.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springdoc.core.converters.models.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import com.social.exception.PostException;
import com.social.exception.UserException;
import com.social.model.Post;
import com.social.model.User;
import com.social.repository.PostRepository;
import com.social.request.PostReplyRequest;
import com.social.request.PostRequest;

@Service
public class PostServiceImplementation implements PostService {
	
	private PostRepository twitRepository;
	
	public PostServiceImplementation(PostRepository twitRepository) {
		this.twitRepository=twitRepository;
	}

	@Override
	public Post createTwit(Post req,User user) {
		
		
		Post twit=new Post();
		twit.setContent(req.getContent());
		twit.setCreatedAt(LocalDateTime.now());
		twit.setImage(req.getImage());
		twit.setUser(user);
		twit.setReply(false);
		twit.setTwit(true);
		twit.setVideo(req.getVideo());
		twit.setIsMeal(req.getIsMeal());
		
		
		return twitRepository.save(twit);
	}

	@Override
	public Post retwit(Long twitId, User user) throws PostException {
		Post twit=findById(twitId);
		if(twit.getRetwitUser().contains(user)) {
			twit.getRetwitUser().remove(user);
		}
		else {
			twit.getRetwitUser().add(user);
		}
		
		return twitRepository.save(twit);
	}

	@Override
	public Post updateTwitByID(Long twitId, Post req, User user) throws PostException {
		
		Post twit=findById(twitId);

		
		if(req.getContent()!= null) {
			twit.setContent(req.getContent());
		}

		twit.setCreatedAt(LocalDateTime.now());

		if(req.getImage()!= null) {
			twit.setImage(req.getImage());
		}

		twit.setUser(twit.getUser());
		twit.setReply(false);
		twit.setTwit(true);
		if(req.getVideo()!= null) {
			twit.setVideo(req.getVideo());
		}
		
		
		return twitRepository.save(twit);
		
	}

	@Override
	public Post findById(Long twitId) throws PostException {
		
		Post twit=twitRepository.findById(twitId)
				.orElseThrow(()-> new PostException("Post Not Found With Id "+twitId));
		
		return twit;
	}

	@Override
	public void deleteTwitById(Long twitId, Long userId) throws PostException, UserException {
		Post twit=findById(twitId);
		
		if(!userId.equals(twit.getUser().getId())) {
			throw new UserException("you can't delete another users twit");
		}
		twitRepository.deleteById(twit.getId());
		
		
	}

	@Override
	public Post removeFromRetwit(Long twitId, User user) throws PostException, UserException {
		
		Post twit=findById(twitId);
	
		twit.getRetwitUser().remove(user);
		
		return twitRepository.save(twit);
	}

	@Override
	public Post createReply(PostReplyRequest req,User user) throws PostException {
		// TODO Auto-generated method stub
		
		Post twit=findById(req.getTwitId());
		
		Post reply=new Post();
		reply.setContent(req.getContent());
		reply.setCreatedAt(LocalDateTime.now());
		reply.setImage(req.getImage());
		reply.setUser(user);
		reply.setReplyFor(twit);
		reply.setReply(true);
		reply.setTwit(false);
		
		
		
		Post savedReply= twitRepository.save(reply);
		
		twit.getReplyTwits().add(savedReply);
		twitRepository.save(twit);
		return twit;
	}

	@Override
	public List<Post> findAllTwit() {
//		 Sort sortByCreatedAtDesc = org.springframework.data.domain.Sort.Order("DESC")
		return twitRepository.findAllByIsTwitTrueOrderByCreatedAtDesc();
	}

	@Override
	public List<Post> getUsersTwit(User user) {
		
		return twitRepository.findByRetwitUserContainsOrUser_IdAndIsTwitTrueOrderByCreatedAtDesc(user, user.getId());
	}

	@Override
	public List<Post> findByLikesContainsUser(User user) {
		return twitRepository.findByLikesUser_Id(user.getId());
	}

	@Override
	public Post updateTwitByID(Long twitId, PostRequest req, User user) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'updateTwitByID'");
	}
	
	

}
